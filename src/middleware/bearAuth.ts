import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}


type DecodedToken = {
    userId: string;
    email: string;
    userType: string;
    exp?: number;
};


//AUTHENTICATION MIDDLEWARE
export const verifyToken = async (token: string, secret: string) => {
    try {
        const decoded =  jwt.verify(token as string, secret as string) as DecodedToken;
        return decoded;
    } catch (error: any) {
        return null;
    }
}

//AUTHORIZATION MIDDLEWARE
export const authMiddleware  = async(req: Request, res: Response, next: NextFunction,requiredRole:string) => {
     const token = req.header("Authorization");
    if (!token) {
        res.status(401).json({ error: "Authorization header is missing" });
        return;
    }

    const decodedToken= await verifyToken(token, process.env.JWT_SECRET as string) as DecodedToken;
    
    if (!decodedToken) {
        res.status(401).json({ error: "Invalid or expired token" });
        return;
    }   
    const userType = decodedToken?.userType;
    // console.log("🚀 ~ authMiddleware ~ decodedToken:", decodedToken)
   
        if (requiredRole === "both" && (userType === "admin" || userType === "member")) {
            if (decodedToken.userType === "admin" || decodedToken.userType === "member") {
                req.user = decodedToken;
                next();
                return;
            }
        } else if (userType === requiredRole) {
            req.user = decodedToken;
            next();
            return;
        }    

    else {
        res.status(403).json({ error: "Forbidden: You do not have permission to access this resource" });
    }    

};

// Middleware to check if the user is an admin
export const adminRoleAuth  = async(req: Request, res: Response, next: NextFunction) => await authMiddleware(req, res, next, "admin");
export const userRoleAuth  = async(req: Request, res: Response, next: NextFunction) => await authMiddleware(req, res, next, "member");
export const bothRolesAuth = async(req: Request, res: Response, next: NextFunction) => await authMiddleware(req, res, next, "both");