// import admin, { db } from "../config/firebase.admin.js";

// export const createMotherAdmin = async ({ email, password, name }) => {
//     try {
//         const userRecord = await admin.auth().createUser({
//             email,
//             password,
//             displayName: name,
//         });

//         await db.collection("adminUsers").doc(userRecord.uid).set({
//             uid: userRecord.uid,
//             idNumber: 'nai',
//             fullName: name,
//             email,
//             status: 'active',
//             role: "mother",
//             createdAt: admin.firestore.FieldValue.serverTimestamp(),
//         });

//         console.log('mother create Successfully')
//         return userRecord;

//     } catch (err) {
//         throw err; // util হিসেবে error throw করবে
//     }
// };

