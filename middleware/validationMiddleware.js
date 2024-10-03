import { body, param, validationResult } from 'express-validator'; // param 파라미터 유효성 체크
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors/customErrors.js';
import Study from '../models/StudyModel.js';
import User from '../models/UserModel.js';
import mongoose from 'mongoose';

const withValidationErrors = (validateValues) => {
  return [
    validateValues, 
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        // 단일 study 호출 시 400 에러로 반환이 되는데, study을 찾을 수 없는 케이스이니 404로 커스텀 에러 적용
        if (errorMessages[0].startsWith('no study')) {
          throw new NotFoundError(errorMessages);
        }

        if (errorMessages[0].startsWith('not authorized')) {
          throw new UnauthorizedError(errorMessages);
        }

        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ]
}

export const validateStudyInput = withValidationErrors([
  body('title').notEmpty().withMessage('타이틀을 입력해주세요.'),
  body('startDate').notEmpty().withMessage('시작 날짜를 입력해주세요.'),
  body('endDate').notEmpty().withMessage('마감 날짜를 입력해주세요.'),
  body('time').notEmpty().withMessage('시간을 입력해주세요.'),
  body('place').notEmpty().withMessage('위치를 입력해주세요.'),
  body('price').notEmpty().withMessage('비용을 입력해주세요.'),
  body('minimumPerson').notEmpty().withMessage('최소 인원을 입력해주세요.'),
  body('maximumPerson').notEmpty().withMessage('최대 인원을 입력해주세요.'),
  body('skillTag').isArray({min:1}).withMessage('주요기술을 선택해주세요.'),
  
  // body('studyType').isIn(Object.values(JOB_TYPE)).withMessage('invalid type value'),
]);

export const validateIdParam = withValidationErrors([
  param('id')
    .custom(async (value, { req }) => {
      const isValidId = mongoose.Types.ObjectId.isValid(value);
      if (!isValidId) throw new BadRequestError('invalid MongoDB Id');

      // 반복되는 study 아이디를 찾는 구문을 유효성 미들웨어로 이동시켜 적용
      const study = await Study.findById(value);
      if (!study) throw new NotFoundError(`no study ${value}`);

      const isAdmin = req.user.role === 'admin';
      const isOwner = req.user.userId === study.createdBy.toString();
      if (!isAdmin && !isOwner) throw new UnauthorizedError('not authorized to acess this route');
    }),
]);

export const validateRegisterInput = withValidationErrors([
  body('uid')
  .notEmpty()
  .withMessage('아이디를 입력해주세요.')
  .custom(async (uid) => {
    const user = await User.findOne({uid});
    if (user) {
      throw new BadRequestError('동일한 아이디가 존재합니다. 다시 입력해주세요.');
    }
  }),
  body('name').notEmpty().withMessage('닉네임을 입력해주세요.'),
  body('email')
  .notEmpty()
  .withMessage('이메일을 입력해주세요.')
  .isEmail()
  .withMessage('이메일 형식이 아닙니다. 올바르게 입력해주세요.')
  .custom(async (email) => {
    const user = await User.findOne({email});
    if (user) {
      throw new BadRequestError('동일한 이메일이 존재합니다. 다시 입력해주세요.');
    }
  }),
  body('password')
  .notEmpty()
  .withMessage('비밀번호를 입력해주세요.')
  .isLength({min:8})
  .withMessage('비밀번호는 8자리 이상 입력해주세요.'),
  body('job')
  .notEmpty()
  .withMessage('희망직무를 선택해주세요.'),
  body('skillTag')
  .isArray({min:1})
  .withMessage('주요기술을 선택해주세요.'),
]);

export const validateLoginInput = withValidationErrors([
  body('uid')
  .notEmpty()
  .withMessage('아이디를 입력해주세요.')
  ,
  // body('email')
  // .notEmpty()
  // .withMessage('이메일을 입력해주세요.')
  // .isEmail()
  // .withMessage('이메일 형식이 아닙니다. 올바르게 입력해주세요.')
  // ,
  body('password')
  .notEmpty()
  .withMessage('비밀번호를 입력해주세요.')
]);

export const validateUpdateUserInput = withValidationErrors([
  body('name').notEmpty().withMessage('닉네임을 입력해주세요.'),
  body('email')
  .notEmpty()
  .withMessage('이메일을 입력해주세요.')
  .isEmail()
  .withMessage('이메일 형식이 아닙니다. 올바르게 입력해주세요.')
  .custom(async (email, { req }) => {
    const user = await User.findOne({email});
    if (user && user._id.toString() !== req.user.userId) {
      throw new BadRequestError('동일한 이메일이 존재합니다. 다시 입력해주세요.'); 
    }
  }),
]);

export const validateUidInput = withValidationErrors([
  body('email')
  .notEmpty()
  .withMessage('이메일을 입력해주세요.')
  .custom(async (email) => {
    const user = await User.findOne({email});
    if (!user) {
      throw new BadRequestError('동일한 이메일이 존재합니다. 다시 입력해주세요.');
    }
  }),
]);

export const validatePasswordInput = withValidationErrors([
  body('uid')
  .notEmpty()
  .withMessage('아이디를 입력해주세요.')
  .custom(async (uid) => {
    const user = await User.findOne({uid});
    if (!user) {
      throw new BadRequestError('동일한 아이디가 존재합니다. 다시 입력해주세요.');
    }
  }),
  body('email')
  .notEmpty()
  .withMessage('이메일을 입력해주세요.')
  .custom(async (email) => {
    const user = await User.findOne({email});
    if (!user) {
      throw new BadRequestError('동일한 이메일이 존재합니다. 다시 입력해주세요.');
    }
  }),
]);

export const validatePasswordResetInput = withValidationErrors([
  body('password')
  .notEmpty()
  .withMessage('비밀번호를 입력해주세요.')
  .isLength({min:8})
  .withMessage('비밀번호는 8자리 이상 입력해주세요.')
  ,
  body('passconfirm')
  .notEmpty()
  .withMessage('passconfirm is required')
  .isLength({min:8})
  .withMessage('passconfirm least 8'),
]);

export const validateIdResetParam = withValidationErrors([
  param('id')
    .custom(async (value, { req }) => {
      const isValidId = mongoose.Types.ObjectId.isValid(value);
      if (!isValidId) throw new BadRequestError('invalid MongoDB Id');

      const user = await User.findById(value);
      if (!user) throw new NotFoundError(`no user ${value}`);
      
      const isAdmin = user.role === 'admin';
      if (isAdmin) throw new UnauthorizedError('Administrator password cannot be changed');

      const isPassConfirm = req.body.password === req.body.passconfirm;
      if (!isPassConfirm) throw new UnauthorizedError('Please check your password again');
    }),
]);