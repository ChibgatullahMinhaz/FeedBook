// // utils/reserveBank.js
// import { db } from "../config/firebase.admin.js";

// // Get current reserve balance
// export const getReserveBankBalance = async (transaction) => {
//     const reserveRef = db.collection("system_stats").doc("reserve_bank");
//     const reserveSnap = await transaction.get(reserveRef);

//     if (!reserveSnap.exists) {
//         throw new Error("Reserve bank not initialized");
//     }

//     return {
//         balance: Number(reserveSnap.data().balance || 0),
//         ref: reserveRef
//     };
// };

// // Log a reserve bank transaction
// export const logReserveTransaction = async (transaction, { amount, type, to, performedBy, balanceBefore, balanceAfter }) => {
//     transaction.set(
//         db.collection("reserveBankTransactions").doc(),
//         {
//             type, 
//             amount,
//             from: { type: "reserve_bank" },
//             to,
//             performedBy,
//             balanceBefore,
//             balanceAfter,
//             createdAt: new Date()
//         }
//     );
// };


// export const initReserveBankBalance = async () => {
//     const snapshot = await db.collection("coinGenerations").get();

//     let total = 0;
//     snapshot.forEach(doc => {
//         total += Number(doc.data().amount || 0);
//     });

//     const reserveRef = db.collection("system_stats").doc("reserve_bank");

//     await reserveRef.set({
//         balance: total,
//         initializedFromGeneration: true,
//         updatedAt: new Date()
//     });

//     console.log(`Reserve bank initialized with balance: ${total}`);
// };




// export const getCurrentReserveBalance = async () => {
//     const reserveRef = db.collection("system_stats").doc("reserve_bank");
//     const snap = await reserveRef.get();

//     if (!snap.exists) {
//         console.log("Reserve bank not initialized");
//         return;
//     }

//     const balance = Number(snap.data().balance || 0);
//     console.log("Current Reserve Bank Balance:", balance);
//     return balance;
// };




// // Get current reserve bank
// export const getReserveBank = async (transaction) => {
//   const reserveRef = db.collection("system_stats").doc("reserve_bank");
//   const reserveSnap = await transaction.get(reserveRef);

//   if (!reserveSnap.exists) {
//     throw new Error("Reserve bank not initialized");
//   }

//   return { 
//     ref: reserveRef, 
//     balance: Number(reserveSnap.data().balance || 0)
//   };
// };

// export const clearAllTransactionHistory = async () => {
//   const collections = [
//     "reserveBankTransactions",
//     "coinGenerations",
//   ];

//   const BATCH_LIMIT = 400; // Firestore safe limit

//   for (const collectionName of collections) {
//     let hasMore = true;

//     while (hasMore) {
//       const snapshot = await db
//         .collection(collectionName)
//         .limit(BATCH_LIMIT)
//         .get();

//       if (snapshot.empty) {
//         hasMore = false;
//         break;
//       }

//       const batch = db.batch();
//       snapshot.docs.forEach((doc) => {
//         batch.delete(doc.ref);
//       });

//       await batch.commit();
//     }

//     console.log(`✅ Cleared collection: ${collectionName}`);
//   }

//   return {
//     success: true,
//     message: "All transaction & generation history cleared",
//   };
// };