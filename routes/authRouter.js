import { Router } from 'express';
const router = Router();

import { 
    login, register, logout, 
    uidSearch, passwordSearch, passwordReset
} from '../controllers/authController.js';
import { 
    validateRegisterInput, validateLoginInput, 
    validateUidInput, validatePasswordInput, validatePasswordResetInput, validateIdResetParam
} from '../middleware/validationMiddleware.js';


router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);
router.get('/logout', logout);

router.post('/userid', validateUidInput, uidSearch);
router.post('/userpw', validatePasswordInput, passwordSearch);

router.patch('/pwreset/:id', validatePasswordResetInput, validateIdResetParam, passwordReset);

export default router;
