import express from 'express'
const router = express.Router();

//contollers
import createWebsite from '../controllers/website/createWebsite.js';
import fetchWebsites from '../controllers/website/fetchWebsite.js';
import getWebsite from '../controllers/website/getWebiste.js';
import deleteWebsite from '../controllers/website/deleteWebsite.js';
import getPublicWebsite from '../controllers/website/getPublicWebsite.js';
import toggleWebsiteVisibility from '../controllers/website/toggelWebsiteVisibility.js';
import updateWebsite from '../controllers/website/updateWebsite.js';
import getWebsitePages from '../controllers/website/getAllPage.js';
//middlewares
import auth from '../middlewares/auth.js';



//routes
router.post('/create',auth,createWebsite);

router.post('/fetch',auth,fetchWebsites);

router.post('/:id',auth,getWebsite);

router.delete('/:id',auth,deleteWebsite);

router.get("/slug/:slug",getPublicWebsite);

router.patch("/:id/visibility",auth,toggleWebsiteVisibility);

router.put("/:id",auth,updateWebsite);
 
router.get("/:websiteId/pages", auth, getWebsitePages);

export default router;