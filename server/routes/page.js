import express from 'express';
const router = express.Router();

//middleware
import auth from '../middlewares/auth.js';

//contollers
import createPage from '../controllers/page/createPage.js';
import getPage from '../controllers/page/getPage.js';
import updatePageBasic from '../controllers/page/updateBasic.js';
import updatePageSlug from '../controllers/page/updateSlug.js';
import updatePageStatus from '../controllers/page/updateStatus.js';
import deletePage from '../controllers/page/deletePage.js';






router.post('/create',auth,createPage);
router.get('/:pageId',auth,getPage);
router.patch("/:pageId",auth,updatePageBasic);
router.patch("/:pageId/slug",auth,updatePageSlug);
router.patch("/:pageId/status",auth,updatePageStatus);
router.delete('/:pageId',auth,deletePage);



export default router;