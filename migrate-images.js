const fs = require('fs');
const path = require('path');

// Get all images from img directory
const imgDir = path.join(__dirname, 'public', 'img');
const imagesJsonPath = path.join(__dirname, 'images.json');

if (fs.existsSync(imgDir)) {
    const files = fs.readdirSync(imgDir);
    const imageFiles = files.filter(file => 
        /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );

    const images = imageFiles.map((file, index) => ({
        id: Date.now() - (index * 1000), // Unique IDs
        name: file,
        filename: file,
        path: `/img/${file}`,
        size: fs.statSync(path.join(imgDir, file)).size,
        uploadDate: new Date().toISOString()
    }));

    const data = { images: images.reverse() }; // Newest first
    fs.writeFileSync(imagesJsonPath, JSON.stringify(data, null, 2));
    
    console.log(`Migrated ${images.length} existing images to images.json`);
} else {
    console.log('No img directory found');
}