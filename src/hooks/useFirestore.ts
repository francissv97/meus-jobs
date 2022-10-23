import { doc, setDoc, Timestamp, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import toast from "react-hot-toast";
import { Job, ProfileType, UserAuth, UserFirestoreDocData } from "../types";
import { generateJobID } from "../utils";

// criar função: getDocumentSnapshot

export async function createNewUserDocumentInFirestore(userEmail: string) {
  try {
    if (userEmail) {
      const docRef = doc(db, "users", userEmail);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", userEmail), {
          profile: {},
          jobs: [],
        });
      }
    }
  } catch (error) {
    console.log("Error adding document: ", error);
    toast.error("Erro ao tentar criar base de dados para este usuário..!");
  }
}

export async function addNewJob(
  user: UserAuth,
  title: string,
  dailyHours: number,
  totalHours: number
) {
  try {
    if (user.email) {
      const docRef = doc(db, "users", user.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const currentData = docSnap.data() as UserFirestoreDocData;
        const currentJobs = currentData.jobs;

        await updateDoc(docRef, {
          jobs: [
            ...currentJobs,
            {
              id: generateJobID(),
              title: title,
              dailyHours: Number(dailyHours),
              totalHours: Number(totalHours),
              createdAt: Timestamp.now(),
            },
          ],
        }).catch((error) => console.error(error));
      }
    }
  } catch (error) {
    console.error(error);
    toast.error("Erro ao tentar adicionar novo job.!");
  }
}

export async function removeJob(job: Job) {
  const { id } = job;
}

export async function editJob(job: Job) {
  const { id } = job;
}
