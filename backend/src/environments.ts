import dotenv from 'dotenv';

console.log("NODE_ENV: " + process.env.NODE_ENV);

const result = dotenv.config()

if (result.error) {
  if (process.env.NODE_ENV === "development") {
    console.error(".env file not found. This is an error condition in development. Additional error is logged below");
    throw result.error;
  }

  // In production, environment variables are injected into the container environment. We should not even have
  // a .env file inside the running container.
}

interface Environment {
  session_secret: string,
  pi_api_key: string,
  platform_api_url: string,
  mongoUri: string,
  frontend_url: string,
}

const env: Environment = {
  session_secret: process.env.SESSION_SECRET || "This is my session secret",
  pi_api_key: process.env.PI_API_KEY || '',
  platform_api_url: process.env.PLATFORM_API_URL || '',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017',
  frontend_url: process.env.FRONTEND_URL || 'http://localhost:3314',
};

export default env;
