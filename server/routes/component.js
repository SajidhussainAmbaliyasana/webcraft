import express from 'express';
const router = express.Router();


import auth from '../middlewares/auth.js';

//controllers
import createComponent from '../controllers/components/createComponent.js';
import getComponents from '../controllers/components/getComponents.js';
import fetchComponent from '../controllers/components/fetchComponent.js';
import updateComponent from '../controllers/components/updateComponent.js';
import deleteComponent from '../controllers/components/deleteComponent.js';
import reorderComponents from '../controllers/components/reorderComponent.js';


router.post('/:pageId/component',auth,createComponent);
router.get("/:pageId/component",auth,getComponents);
router.get("/:pageId/:componentId",auth,fetchComponent);
router.patch("/:pageId/:componentId",auth,updateComponent);
router.delete('/:pageId/:componentId',auth,deleteComponent);
router.put("/:pageId/reorder", auth, reorderComponents);








export default router;