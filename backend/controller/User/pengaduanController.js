const { Pengaduan, User } = require('../../associations');  // Asosiasi model Pengaduan dan User
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Konfigurasi Multer untuk upload gambar
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '../../../frontend/public/images/pengaduan');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Math.round(Math.random() * 1e9);
        const fileExt = path.extname(file.originalname).toLowerCase();
        cb(null, `${uniqueSuffix}${fileExt}`);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only images (jpeg, jpg, png) are allowed!'));
    },
}); // 'image' adalah nama field input untuk gambar

// **Create Pengaduan**
const createPengaduan = async (req, res) => {
    const { name, email, jenis_sampah, no_handphone, alamat, description, provinsi } = req.body;

    const userId = req.userId;  // Menyimpan ID User yang melakukan pengaduan
    const image_path = req.file ? `${req.file.filename}` : null;

    try {
        const newPengaduan = await Pengaduan.create({
            name,
            email,
            jenis_sampah,
            image_path,
            no_handphone,
            alamat,
            provinsi,
            status: 'Diproses',
            description,
            createdBy: userId,  // Menyimpan siapa yang membuat pengaduan
        });
        res.status(201).json({ message: 'Pengaduan created successfully', pengaduan: newPengaduan });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// **Get All Pengaduan**
const getPengaduan = async (req, res) => {
    try {
        const pengaduans = await Pengaduan.findAll({
            include: [{
                model: User,
                as: 'creator', // Asosiasi antara Pengaduan dan User
                attributes: ['id', 'name', 'email', 'image_path'],
            }],
            attributes: ['id', 'name', 'email', 'jenis_sampah', 'image_path', 'no_handphone', 'alamat', 'description', 'status', 'provinsi', 'createdAt'],
        });
        res.status(200).json({ pengaduans });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// **Get Pengaduan by ID**
const getPengaduanById = async (req, res) => {
    const { id } = req.params;
    try {
        const pengaduan = await Pengaduan.findByPk(id, {
            include: [{
                model: User,
                as: 'creator',
                attributes: ['id', 'name', 'email', 'image_path'],
            }],
            attributes: ['id', 'name', 'email', 'jenis_sampah', 'image_path', 'no_handphone', 'alamat', 'description', 'status', 'provinsi', 'createdAt'],
        });

        if (!pengaduan) {
            return res.status(404).json({ message: 'Pengaduan not found' });
        }

        res.status(200).json({ pengaduan });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// **Update Pengaduan**
const updatePengaduan = async (req, res) => {
    const { id } = req.params;
    const { name, email, jenis_sampah, no_handphone, alamat, description } = req.body;

    const image_path = req.file ? `/images/pengaduan/${req.file.filename}` : null; // Path gambar baru jika ada

    try {
        const pengaduan = await Pengaduan.findByPk(id);
        if (!pengaduan) {
            return res.status(404).json({ message: 'Pengaduan not found' });
        }

        pengaduan.name = name || pengaduan.name;
        pengaduan.email = email || pengaduan.email;
        pengaduan.jenis_sampah = jenis_sampah || pengaduan.jenis_sampah;
        pengaduan.image_path = image_path || pengaduan.image_path;
        pengaduan.no_handphone = no_handphone || pengaduan.no_handphone;
        pengaduan.alamat = alamat || pengaduan.alamat;
        pengaduan.description = description || pengaduan.description;

        await pengaduan.save();
        res.status(200).json({ message: 'Pengaduan updated successfully', pengaduan });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// **Delete Pengaduan**
const deletePengaduan = async (req, res) => {
    const { id } = req.params;
    try {
        const pengaduan = await Pengaduan.findByPk(id);
        if (!pengaduan) {
            return res.status(404).json({ message: 'Pengaduan not found' });
        }

        await pengaduan.destroy();
        res.status(200).json({ message: 'Pengaduan deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createPengaduan,
    getPengaduan,
    getPengaduanById,
    updatePengaduan,
    deletePengaduan,
    upload,
};