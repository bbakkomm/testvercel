import Study from "../models/StudyModel.js";
import { StatusCodes } from "http-status-codes";
import coludinary from 'cloudinary';
import { promises as fs } from 'fs';

// GET ALL study
export const getObjAllStudy = async (req, res) => {
  const studys = await Study.find({});
  res.status(StatusCodes.OK).json({ studys });
}

// GET USER ALL study
export const getAllStudy = async (req, res) => {
  const studys = await Study.find({createdBy:req.params.id});
  res.status(StatusCodes.OK).json({ studys });
}

// CREATE study
export const createStudy = async (req, res) => {
  req.body.createdBy = req.user.userId;
  req.body.member = [req.user.userId];

  if (req.file) {
    const response = await coludinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    req.body.thumb = response.secure_url;
    req.body.thumbPublicId = response.public_id;

    const createStudy = await Study.create(req.body);

    // if (createStudy.thumbPublicId) {
    //   await coludinary.v2.uploader.destroy(createStudy.thumbPublicId);
    // }

    res.status(StatusCodes.CREATED).json({ msg:'study create' });
  } else {
    throw new Error("파일이 없습니다.");
  }
}

// GET SINGLE study
export const getStudy = async (req, res) => {
  const study = await Study.findOne({ _id: req.params.id});
  res.status(StatusCodes.OK).json({ study });
}

// GET ALL study like
export const getObjAllStudyLike = async (req, res) => {
  const studys = await Study.find({ like: req.params.id });
  res.status(StatusCodes.OK).json({ studys });
}

// GET ALL study member
export const getObjAllStudyParticipate = async (req, res) => {
  const studys = await Study.find({ member: req.params.id });
  res.status(StatusCodes.OK).json({ studys });
}

// UPDATE study
export const updateStudy = async (req, res) => {
  const updateStudy = await Study.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(StatusCodes.OK).json({ msg:'study edit'});
}

export const updateEditStudy = async (req, res) => {
  if (req.file) {
    const response = await coludinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    req.body.thumb = response.secure_url;
    req.body.thumbPublicId = response.public_id;
  }

  const updateStudy = await Study.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(StatusCodes.OK).json({ msg:'study edit'});
}

// DELETE study
export const deleteStudy = async (req, res) => {
  const removeStudy = await Study.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ msg: 'study delete'});
}