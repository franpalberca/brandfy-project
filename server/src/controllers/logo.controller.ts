// import { Request, Response } from 'express'
// import uploadImageToS3 from '../utils/s3';

// export const createLogo = async (req: Request, res: Response) => {
//     try {
//         const imageUrl = await uploadImageToS3(req.files);
//         res.json({ imageUrl });
//       } catch (err) {
//         console.error('Error al cargar la imagen:', err);
//         res.status(500).json({ error: 'Error al cargar la imagen' });
//       }
//     }