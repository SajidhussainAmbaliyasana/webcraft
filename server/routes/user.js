import express from 'express';
const router = express.Router();


//middleware
import auth from '../middlewares/auth.js';
import isSuperAdmin from '../middlewares/isSuperAdmin.js';

//controollers
import register from '../controllers/user/register.js';
import login from '../controllers/user/login.js';
import logout from '../controllers/user/logout.js';
import me from '../controllers/user/me.js';
import refreshToken from '../controllers/user/refershToken.js';
import getAllUsers from '../controllers/user/alluser.js';
import getSingleUser from '../controllers/user/getSingleUser.js';


router.post('/register',register);

router.post('/login',login);

router.post('/logout',logout);

router.post('/me',auth,me);

router.post("/refresh-token",refreshToken);

router.post('/users',auth,isSuperAdmin,getAllUsers);

router.post('/user/:id',auth,isSuperAdmin,getSingleUser);


export default router;