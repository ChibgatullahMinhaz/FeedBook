
// import jwt from "jsonwebtoken";
// import config from "../../config/config";


// export const generateAccessToken = (user: any) => {
//     return jwt.sign(
//         { uid: user.uid, role: user.role, agencyId: user.agencyId },
//         config.jwtSecret,
//         { expiresIn: config.jwtExpired }
//     );
// };

// export const generateRefreshToken = (user: any) => {
//     return jwt.sign(
//         { uid: user.uid },
//         config.jwtRefresh,
//         { expiresIn: config.jwtRefresh }
//     );
// };
