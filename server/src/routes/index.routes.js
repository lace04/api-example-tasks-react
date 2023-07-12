import { Router } from 'express';
import {
  indexWelcome,
  testConnectdb,
} from '../controllers/index.controller.js';

const router = Router();

router.get('/index', indexWelcome);
router.get('/test', testConnectdb);

export default router;
