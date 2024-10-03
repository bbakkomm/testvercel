import { Router } from 'express';
const router = Router();

import { 
  getObjAllStudy,
  getObjAllStudyParticipate,
  getObjAllStudyLike,
  createStudy, 
  
  getStudy, 
  updateStudy, 
  deleteStudy, 

  updateEditStudy,

  getAllStudy, 
} from '../controllers/studyController.js';
import { validateStudyInput, validateIdParam } from '../middleware/validationMiddleware.js';
import upload from '../middleware/multerMiddleware.js';

router.route('/')
  .get(getObjAllStudy)
  .post(upload.single('thumb'), validateStudyInput, createStudy);
  
router.route('/:id')
  .get(getStudy)
  // .patch(validateStudyInput, validateIdParam, updateStudy)
  .patch(updateStudy)
  .delete(validateIdParam, deleteStudy);

router.route('/studyedit/:id')
  .patch(upload.single('thumb'), validateStudyInput, updateEditStudy)
  
router.route('/user/:id')
  .get(getAllStudy)

router.route('/member-all/:id')
  .get(getObjAllStudyParticipate)

router.route('/like-all/:id')
  .get(getObjAllStudyLike)
export default router;