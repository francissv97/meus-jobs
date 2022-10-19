import {
  addDoc,
  collection,
  doc,
  setDoc,
  Timestamp,
  FieldValue,
  query,
  getDoc,
  where,
  updateDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "../services/firebase";
import { Job, Profile, ProfileFieldValues } from "../types";
import { useAuth } from "./useAuth";

export async function createNewUserDocumentInFirestore(userEmail: string) {
  try {
    const docRef = doc(db, "users", userEmail);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(doc(db, "users", userEmail), {
        profile: {},
        jobs: {},
      });
    }
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

// const docData = {
//   profile: {
//     daysPerWeek: 5,
//     hoursPerDay: 4,
//     vacationPerYear: 15,
//     monthlyBudget: 4000,
//   } as Profile,
// };
