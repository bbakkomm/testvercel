import { Router } from 'express';
import { 
    getAllUsers,
    getUser,

    getApplicationStats, 
    getCurrentUser, 
    updateUser,
    updateProfile
} from '../controllers/userController.js';
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js';
import { authorizePermissions } from '../middleware/authMiddleware.js';
import upload from '../middleware/multerMiddleware.js';

const router = Router();

router.get('/all-user', getAllUsers);
router.get('/single-user/:id', getUser);

router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats', [
    authorizePermissions('admin'), 
    getApplicationStats
]);


router.patch('/update-user', validateUpdateUserInput, updateUser);
router.patch('/profile-update-user', upload.single('thumb'), validateUpdateUserInput, updateProfile);

export default router;
