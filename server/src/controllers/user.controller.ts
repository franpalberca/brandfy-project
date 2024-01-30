import {Request, Response} from 'express';
import {prisma} from '../db/clientPrisma';

export const createUser = async (req: Request, res: Response) => {
	const {email, name, picture} = req.body;
	console.log(req.body);
	try {
		if (!name || !email) {
			return res.status(400).send({
				status: 'error',
				error: 'Name and email are required fields.',
			});
		}

		const emailExist = await prisma.user.findUnique({
			where: {userEmail: email},
			include: {
				company: {
					select: {
						companyName: true,
						companyLogo: true,
						companyStyles: {
							select: {
								companyStylesNameCase: true,
								companyStylesNameFont: true,
								companyStylesNameSpacing: true,
								companyStylesNameAlignment: true,
								companyStylesLogoRotation: true,
								companyStylesLogoScale: true,
								companyStylesLogoVertical: true,
								companyStylesLogoHorizontal: true,
							},
						},
					},
				},
			},
		});

		if (!emailExist) {
			// if the user does not exist in the database, create a new user
			const newUser = await prisma.user.create({
				data: {userName: name, userEmail: email, userImage: picture},
				include: {
					company: {
						select: {
							companyName: true,
							companyLogo: true,
							companyStyles: {
								select: {
									companyStylesNameCase: true,
									companyStylesNameFont: true,
									companyStylesNameSpacing: true,
									companyStylesNameAlignment: true,
									companyStylesLogoRotation: true,
									companyStylesLogoScale: true,
									companyStylesLogoVertical: true,
									companyStylesLogoHorizontal: true,
								},
							},
						},
					},
				},
			});
			return res.status(201).send({message: 'User created successfully!', user: newUser});
		} else {
			// If the email already exists, return the data of the existing user
			return res.status(200).send({
				status: 'success',
				message: 'User already exists.',
				user: emailExist,
			});
		}
	} catch (err) {
		console.error(err);
		return res.status(500).send({error: 'Internal server error'});
	}
};

export const getUserByEmailParams = async (req: Request, res: Response) => {
	const {userEmail} = req.params;

	try {
		const userById = await prisma.user.findUnique({
			where: {userEmail: userEmail},
			include: {
				company: {
				select: {
					companyName: true,
					companyLogo: true,
					companyStyles: {
						select: {
							companyStylesNameCase: true,
							companyStylesNameFont: true,
							companyStylesNameSpacing: true,
							companyStylesNameAlignment: true,
							companyStylesLogoRotation: true,
							companyStylesLogoScale: true,
							companyStylesLogoVertical: true,
							companyStylesLogoHorizontal: true,
						},
					},
				},
			},
		},
		});

		return res.status(200).send(userById);
	} catch (err) {
		console.error(err);
		return res.status(500).send({error: 'Internal server error'});
	}
};

export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const allUsers = await prisma.user.findMany();

		return res.status(201).send({message: 'Here you have all users', user: allUsers});
	} catch (err) {
		console.error(err);
		return res.status(500).send({error: 'Internal server error'});
	}
};

export const deleteUserById = async (req: Request, res: Response) => {
	const {userId} = req.params;

	try {
		const deleteUser = await prisma.user.delete({where: {id: userId}});
		if (!deleteUser) {
			return res.status(204).send();
		}

		return res.status(204).send({message: 'User deleted successfully!'});
	} catch (err) {
		console.error(err);
		return res.status(500).send({error: 'Internal server error'});
	}
};
