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
  //* Cloud Storage Configurations
  cloudBucketName: process.env.CF_R2_BUCKET_NAME,
  cloudRegion: process.env.CF_R2_REGION,
  CF_R2_ACCESS_KEY_ID: process.env.CF_R2_ACCESS_KEY_ID,
  CF_R2_SECRET_ACCESS_KEY: process.env.CF_R2_SECRET_ACCESS_KEY,
  //* better auth config
  bauthsecret: process.env.BETTER_AUTH_SECRET,
  bauthurl: process.env.BETTER_AUTH_URL,
  appUrl: process.env.APP_URL || "http://localhost:3000",
  //* email config
  emailHost: process.env.EMAIL_HOST,
  emailPort: parseInt(process.env.EMAIL_PORT || "587", 10),
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  //* seed admin
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,
  displayName: process.env.ADMIN_NAME,

};

export default config;