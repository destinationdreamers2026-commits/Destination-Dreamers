export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Vercel doesn't support file uploads to filesystem
    // This is a placeholder - uploads won't work on Vercel
    res.status(400).json({ 
        error: 'File uploads not supported on Vercel. Use Cloudinary or other cloud storage.' 
    });
}