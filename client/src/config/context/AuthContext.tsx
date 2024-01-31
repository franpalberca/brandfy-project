import {createContext, useState, ReactNode, Dispatch, SetStateAction} from 'react';

interface CompanyStylesI {
	companyStylesId: string;
	companyStylesNameCase: string;
	companyStylesNameFont: number;
	companyStylesNameSpacing: number;
	companyStylesNameAlignment: number;
	companyStylesLogoRotation: number;
	companyStylesLogoScale: number;
	companyStylesLogoVertical: number;
	companyStylesLogoHorizontal: number;
	companyStylesCreatedAt: string;
	companyStylesUpdatedAt: string;
	Company: CompanyI | null;
	companyCompanyId: string | null;
}

interface CompanyI {
	companyId: string;
	companyName: string;
	companyLogo: string | null;
	companyCreatedAt: string;
	companyUpdatedAt: string;
	companyStyles: CompanyStylesI[];
	User: UserI | null;
	userId: string | null;
}

interface UserI {
	id: string;
	userEmail: string;
	userName?: string | null;
	userPassword?: string | null;
	userCreatedAt: string;
	userUpdatedAt: string;
	company: CompanyI[];
}

interface AuthContextTypeI {
	user: UserI | null;
	setUser: Dispatch<SetStateAction<UserI | null>>;
}

const AuthContext = createContext<AuthContextTypeI>({
	user: null,
	setUser: () => {},
});

interface AuthProviderProps {
	children: ReactNode;
}

const AuthProvider = ({children}: AuthProviderProps) => {
	const [user, setUser] = useState<UserI | null>(null);

	return <AuthContext.Provider value={{user, setUser}}>{children}</AuthContext.Provider>;
};

export {AuthContext, AuthProvider};
