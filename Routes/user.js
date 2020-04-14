const express = require('express');
const router = express.Router();
const {postUser,getUser,getVerify,postVerify} = require('../Controller/user');

router.get('/',getUser);
router.post('/otpsend',postUser);

router.get('/verification/',getVerify);
router.post('/verification/',postVerify);
module.exports = router;