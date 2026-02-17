import "express";

declare global {
  namespace Express {
    interface AuthUser {
      _id: string;
      uid: string;
      email?: string;
      role?: string;
      idNumber?: string;
      mongoId?: string;
      country?:string;
    }

    interface Request {
      user?: AuthUser;
    }
  }
}
