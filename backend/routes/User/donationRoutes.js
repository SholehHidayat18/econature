const express = require('express')
const router = express.Router();
const authenticateJWT = require('../../middlewares/authMiddleware');

const { upload, createDonation, deleteDonation, getDonationById, getDonations, updateDonation } = require('../../controller/User/donationController')

// Mitra
router.get('/donations', upload.none(), authenticateJWT, getDonations);
router.get('/donations/:id', upload.none(), authenticateJWT, getDonationById);
router.post('/donations/create', upload.single('image_path'), authenticateJWT, createDonation);
router.put('/donations/update/:id', upload.single('image_path'), authenticateJWT, updateDonation);
router.delete('/donations/delete/:id', upload.none(), authenticateJWT, deleteDonation);



module.exports = router;