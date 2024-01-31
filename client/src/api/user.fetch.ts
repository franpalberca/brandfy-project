const urlUser = import.meta.env.VITE_API_URL_USER;

interface BodyDataI {
	userName: string;
	userEmail: string;
	userPassword: string;
}

interface UserDataI {
	userEmail: string;
	userPassword: string;
}

export const createUser = async (bodyData: BodyDataI) => {
	try {
		const response = await fetch(urlUser, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(bodyData),
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};

export const getUser = async (userData: UserDataI) => {
	try {
		const response = await fetch(`${urlUser}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}
