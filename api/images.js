import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const imagesPath = path.join(process.cwd(), 'images.json');
        if (fs.existsSync(imagesPath)) {
            const data = JSON.parse(fs.readFileSync(imagesPath, 'utf8'));
            res.json(data);
        } else {
            res.json({ images: [] });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to load images' });
    }
}