// import { db } from "../config/firebase.admin.js";

// export const totalBalanceOfReserveBank = async () => {
//     const snapshot = await db
//         .collection("coinGenerations")
//         .get();

//     if (snapshot.empty) {
//         return {
//             totalAmount: 0,
//             totalRecords: 0,
//         };
//     }

//     let totalAmount = 0;

//     snapshot.forEach(doc => {
//         const data = doc.data();
//         const amount = Number(data.amount || 0);
//         totalAmount += amount;
//     });
//     console.log({
//         totalAmount,
//         totalRecords: snapshot.size,
//     })
//     return {
//         totalAmount,
//         totalRecords: snapshot.size,
//     };
// };
