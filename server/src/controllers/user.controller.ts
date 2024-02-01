import {Request, Response} from 'express';
import {prisma} from '../db/clientPrisma';
import bcrypt from 'bcrypt'

export const createUser = async (req: Request, res: Response) => {
	const {userEmail, userName, userPassword} = req.body;
	
	try {
		if (!userName || !userEmail) {
			return res.status(400).send({
				status: 'error',
				error: 'Name and email are required fields.',
			});
		}
		const hashedPassword = await bcrypt.hash(userPassword, 10)

		const emailExist = await prisma.user.findUnique({
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

		if (!emailExist) {
			const newUser = await prisma.user.create({
				data: {userName: userName, userEmail: userEmail, userPassword: hashedPassword},
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

export const loginUser = async (req: Request, res: Response) => {
    const { userEmail, userPassword } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { userEmail: userEmail },
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

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(userPassword, user.userPassword);
        if (!passwordMatch) {
            return res.status(401).send({ error: 'Invalid password' });
        }
		req.setTimeout(12000, () => {
			res.status(408);
			res.send("Request timeout")
		})
        return res.status(200).send({ user: user });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Internal server error' });
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
