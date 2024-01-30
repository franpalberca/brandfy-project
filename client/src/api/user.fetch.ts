const urlUser = import.meta.env.VITE_API_URL_USER;

interface BodyDataI {
	name: string;
	email: string;
	picture: string;
}

export const createUser = async (bodyData: BodyDataI, getToken: any) => {
	try {
		
		const token = await getToken();
		const response = await fetch(urlUser, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(bodyData),
		});
		const data = await response.json();
		return data;
	} catch (err) {
		console.error(err);
	}
};
