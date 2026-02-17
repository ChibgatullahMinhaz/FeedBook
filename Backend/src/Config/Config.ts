import dotenv from "dotenv";

import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};


function mustGetEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`❌ Environment variable ${key} is missing`);
  }
  return value;
}

const config = {
  port: parseInt(process.env.PORT || "8080", 10),
  db_url: getEnvVar("DATABASE_URL"),
  jwtSecret: mustGetEnv("JWT_SECRET"),
  jwtRefresh: mustGetEnv("JWT_REFRESH_SECRET"), jwtExpired: process.env.JWT_EXPIRES_IN,
  jwtExpiresIn: mustGetEnv("JWT_EXPIRES_IN"),
  jwtRefreshExpiresIn: mustGetEnv("JWT_REFRESH_EXPIRES_IN"),
  jwtRFExpired: process.env.JWT_REFRESH_EXPIRES_IN,
  mongoUri: process.env.MONGO_URI,
  firebaseServiceKey: process.env.FIREBASE_SERVICE_KEY,
  cloudBucketName: process.env.CF_R2_BUCKET_NAME,
  cloudRegion: process.env.CF_R2_REGION
};



export default config;
