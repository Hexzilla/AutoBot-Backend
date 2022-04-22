import cors, { CorsOptions } from 'cors';

const getApplicationAllowedOrigins = (): string[] => {
	const env = process.env.NODE_ENV;

	switch (env) {
		case 'production':
			return [
				'https://pixl.xyz',
				'https://autoboto.netlify.app',
			];
		case 'development':
		default:
			return [
				'http://localhost:3000',
				'http://localhost:3001',
				'https://autoboto.netlify.app',
			];
	}
};

const AppliationCorsOptions: CorsOptions = {
	origin: getApplicationAllowedOrigins(),
	methods: ['PUT', 'GET', 'POST', 'OPTIONS'],
	optionsSuccessStatus: 200,
};

export default cors(AppliationCorsOptions);
