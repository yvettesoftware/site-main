const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const onboardingController = require('../controllers/onboardingController');

router.post('/check', onboardingController.checkOnboardingByUserID);
router.post('/start', onboardingController.newOnboarding);
router.patch('/continue', onboardingController.updateOnboarding);
router.post(
    '/upload-docs',
    upload.fields([
        { name: 'paystubs', maxCount: 5 },
        { name: 'bank_statements', maxCount: 5 }
    ]),
    onboardingController.uploadDocs
);

module.exports = router;