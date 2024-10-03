import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

// 사용자 등록 컨트롤러
export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? 'admin' : 'user';

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'user created' });
}

// 로그인 컨트롤러
export const login = async (req, res) => {
  const user = await User.findOne({ uid: req.body.uid });

  const isValidUser = user && (await comparePassword(req.body.password, user.password));

  if (!isValidUser) throw new UnauthenticatedError('invalid credentials');
  
  const token = createJWT({ userId: user._id, role: user.role });
  
  const oneDay = 1000 * 60*60*24;

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(StatusCodes.OK).json({ msg: 'user logged in' });
}

export const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: 'user logged out' });
}

// 아이디 찾기 컨트롤러
export const uidSearch = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) throw new UnauthenticatedError('invalid credentials');

  res.status(StatusCodes.OK).json({ uid: user.uid });
}

// 비밀번호 찾기 컨트롤러
export const passwordSearch = async (req, res) => {
  const user = await User.findOne({ uid: req.body.uid });
  const isUserEmail = req.body.email === user.email ? true : false;

  if (!user || !isUserEmail) throw new UnauthenticatedError('invalid credentials');

  res.status(StatusCodes.OK).json({ id: user._id });
}

// 비밀번호 재설정 컨트롤러
export const passwordReset = async (req, res) => {
  const password = req.body.password;
  const passconfirm = req.body.passconfirm;
  if (password !== passconfirm) throw new UnauthenticatedError('invalid credentials');

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const updateUserPassword = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(StatusCodes.OK).json({ msg:'password edit', user: updateUserPassword });
}