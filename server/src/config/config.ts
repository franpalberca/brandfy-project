import dotenv from 'dotenv';
import AWS from 'aws-sdk'

dotenv.config();
const s3 = new AWS.S3();

type TConfig = {
	[key: string]: EnvironmentConfig;
};

type EnvironmentConfig = {
	app: AppConfig;
	auth0: Auth0Config;
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

type AWSConfig = {
	AWS_BUCKET_NAME: string | undefined;
	AWS_ACCESS_KEY_ID: string | undefined;
	AWS_SECRET_ACCESS_KEY: string | undefined;
	AWS_REGION: string | undefined;
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
		aws: {
			AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
			AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
			AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
			AWS_REGION: process.env.AWS_REGION,
		},
	},
	production: {
		app: {
			PORT: process.env.PORT || 8081,
		},
		auth0: {
			client_origin: process.env.APP_ORIGIN,
			audience: process.env.AUTH0_AUDIENCE,
			issuer: process.env.AUTH0_ISSUER,
		},
		aws: {
			AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
			AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
			AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
			AWS_REGION: process.env.AWS_REGION,
		},
	},
};

export default CONFIG[ENV];
