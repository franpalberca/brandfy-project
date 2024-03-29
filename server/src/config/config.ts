import dotenv from 'dotenv';

dotenv.config();

type TConfig = {
	[key: string]: EnvironmentConfig;
};

type EnvironmentConfig = {
	app: AppConfig;
	auth0: Auth0Config;
	db: MongoDBConfig;
	aws: AWSConfig;
};

type AppConfig = {
	PORT: string | number;
};

type Auth0Config = {
	client_origin: string | undefined;
	audience: string | undefined;
	issuer: string | undefined;
};

type MongoDBConfig = { URI: string };

type AWSConfig = {
	BUCKET_NAME: string | undefined;
	ACCESS_KEY_ID: string | undefined;
	SECRET_ACCESS_KEY: string | undefined;
	REGION: string | undefined;
};

if (process.env.NODE_ENV === 'production') {
	dotenv.config({path: '.env.production'});
} else {
	dotenv.config({path: '.env.development'});
}

const ENV = process.env.NODE_ENV ?? 'development';

const CONFIG: TConfig = {
	development: {
		app: {
			PORT: process.env.PORT || 8081,
		},
		auth0: {
			client_origin: process.env.APP_ORIGIN,
			audience: process.env.AUTH0_AUDIENCE,
			issuer: process.env.AUTH0_ISSUER,
		},
		db: {
            URI: process.env.MONGO_DB_URI || ''
        },
		aws: {
			BUCKET_NAME: process.env.BUCKET_NAME,
			ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
			SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
			REGION: process.env.REGION,
		},
	},
	production: {
		app: {
			PORT: process.env.PORT || 8082,
		},
		auth0: {
			client_origin: process.env.APP_ORIGIN,
			audience: process.env.AUTH0_AUDIENCE,
			issuer: process.env.AUTH0_ISSUER,
		},
		db: {
            URI: process.env.MONGO_DB_URI || ''
        },
		aws: {
			BUCKET_NAME: process.env.BUCKET_NAME,
			ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
			SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
			REGION: process.env.AWS_REGION,
		},
	},
};

export default CONFIG[ENV];
