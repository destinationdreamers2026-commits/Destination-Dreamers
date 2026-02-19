const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage: storage,
    limits: { 
        fileSize: 50 * 1024 * 1024, // 50MB limit
        files: 50 // Max 50 files
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});

// Load or create images.json
const imagesJsonPath = path.join(__dirname, 'images.json');
function loadImages() {
    if (fs.existsSync(imagesJsonPath)) {
        return JSON.parse(fs.readFileSync(imagesJsonPath, 'utf8'));
    }
    return { images: [] };
}

function saveImages(data) {
    fs.writeFileSync(imagesJsonPath, JSON.stringify(data, null, 2));
}

// Routes
app.get('/api/images', (req, res) => {
    const data = loadImages();
    res.json(data);
});

app.post('/api/upload', (req, res) => {
    upload.array('images', 50)(req, res, (err) => {
        if (err) {
            console.error('Upload error:', err);
            return res.status(400).json({ error: err.message });
        }
        
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        const uploadedImages = [];
        const data = loadImages();

        req.files.forEach(file => {
            const imageData = {
                id: Date.now() + Math.random(),
                name: file.originalname,
                filename: file.filename,
                path: `/uploads/${file.filename}`,
                size: file.size,
                uploadDate: new Date().toISOString()
            };
            uploadedImages.push(imageData);
            data.images.unshift(imageData);
        });

        saveImages(data);
        res.json({ success: true, images: uploadedImages, count: uploadedImages.length });
    });
});

// Serve uploaded images
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});