import { Request, Response } from 'express'
import {S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand} from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import config from '../config/config';
import crypto from 'crypto'
import { prisma } from '../db/clientPrisma';

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')
const imageName = randomImageName()

const s3 = new S3Client([{
credentials: {
	accessKeyId: config.aws.AWS_ACCESS_KEY_ID,
	secretAccessKey: config.aws.AWS_SECRET_ACCESS_KEY,
},
region: config.aws.AWS_REGION,
}]);

export const createImage = async (req: Request, res: Response) => {

	const { companyName, rotation, scale, verticalPosition,horizontalPosition, textTransform, fontWeight, letterSpacing, alignment } = req.body
	const params = {
        Bucket: config.aws.AWS_BUCKET_NAME,
        Key: imageName,
        Body: req.file?.buffer,
        ContentType: req.file?.mimetype
    };
    const command = new PutObjectCommand(params);
    await s3.send(command);

    try {
        const postLogoInDB = await prisma.company.create({
            data: {
                companyLogo: imageName,
                companyName: companyName,
                companyStyles: {
                    create: {
                        companyStylesNameCase: textTransform,
                        companyStylesNameFont: parseInt(fontWeight),
                        companyStylesNameSpacing: parseInt(letterSpacing),
                        companyStylesNameAlignment: alignment === 'left' ? 0 : alignment === 'center' ? 1 : 2,
                        companyStylesLogoRotation: parseInt(rotation),
                        companyStylesLogoScale: parseInt(scale),
                        companyStylesLogoVertical: parseInt(verticalPosition),
                        companyStylesLogoHorizontal: parseInt(horizontalPosition)
                    }
                }
            }
        });
        res.send(postLogoInDB);
    } catch (error) {
        console.error('Error al guardar el logo en la base de datos:', error);
        res.status(500).send('Error interno del servidor');
    }
};

export const getCompanysInfo = async (req: Request, res: Response) => {
    try {
        const images = await prisma.company.findMany();

        for (const image of images) {
            const getObjectParams = {
                Bucket: config.aws.AWS_BUCKET_NAME,
                Key: image.companyName,
            };
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            image.companyLogo = url;
        }

        res.json(images);
    } catch (error) {
        console.error("Error obteniendo datos de las compañías:", error);
        res.status(500).json({ error: "Error obteniendo datos de las compañías" });
    }
};
