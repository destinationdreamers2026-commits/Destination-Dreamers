# Dynamic Image Gallery - ClickByAzmi

A database-free dynamic image gallery using Node.js + Express with local file storage.

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Migrate existing images:**
   ```bash
   node migrate-images.js
   ```

3. **Start the server:**
   ```bash
   npm start
   ```
   Or for development:
   ```bash
   npm run dev
   ```

4. **Access the gallery:**
   Open `http://localhost:3000` in your browser

## Project Structure

```
ClickByAzmi/
├── server.js              # Main Express server
├── package.json           # Dependencies
├── images.json            # Image metadata storage
├── migrate-images.js      # Migration script for existing images
├── uploads/               # Directory for new uploaded images
├── public/                # Static files served by Express
│   ├── index.html         # Dynamic gallery frontend
│   ├── style.css          # Your existing styles
│   ├── img/               # Your existing images
│   └── clickbyazmi-favicon.png
└── README-GALLERY.md      # This file
```

## Features

- ✅ Image upload with drag & drop support
- ✅ File validation (type, size)
- ✅ Automatic gallery updates
- ✅ JSON-based metadata storage
- ✅ Preserves existing images
- ✅ 5MB file size limit
- ✅ Unique filename generation

## API Endpoints

- `GET /api/images` - Get all images metadata
- `POST /api/upload` - Upload new image
- `GET /uploads/:filename` - Serve uploaded images
- `GET /img/:filename` - Serve existing images

## Sample images.json Format

```json
{
  "images": [
    {
      "id": 1640995200000,
      "name": "original-filename.jpg",
      "filename": "1640995200000-123456789.jpg",
      "path": "/uploads/1640995200000-123456789.jpg",
      "size": 2048576,
      "uploadDate": "2024-01-01T12:00:00.000Z"
    }
  ]
}
```

## Why Not Base64/Text Storage?

Base64 encoding increases file size by ~33% and creates several issues:
- **Performance**: Large JSON files slow down parsing
- **Memory**: Entire images loaded into RAM
- **Scalability**: File system limits on large text files
- **Maintenance**: Difficult to manage individual images
- **Caching**: Browsers can't cache individual images

## Migration to Cloudinary (Future)

This setup can easily migrate to Cloudinary:

1. **Install Cloudinary SDK:**
   ```bash
   npm install cloudinary
   ```

2. **Replace Multer storage with Cloudinary:**
   ```javascript
   const cloudinary = require('cloudinary').v2;
   
   // Configure Cloudinary
   cloudinary.config({
     cloud_name: 'your-cloud-name',
     api_key: 'your-api-key',
     api_secret: 'your-api-secret'
   });
   
   // Upload to Cloudinary instead of local storage
   const result = await cloudinary.uploader.upload(file.path);
   ```

3. **Update images.json to store Cloudinary URLs**
4. **Keep the same frontend - no changes needed**

## Deployment Notes

- Set `NODE_ENV=production` for production
- Use PM2 or similar for process management
- Configure reverse proxy (nginx) for production
- Set up proper file permissions for uploads directory
- Consider adding image optimization (sharp, imagemin)

## Security Considerations

- File type validation implemented
- File size limits enforced
- Unique filename generation prevents conflicts
- No direct file system access from frontend
- Input sanitization for file uploads