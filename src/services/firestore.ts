import {
  doc,
  setDoc,
  Timestamp,
  getDoc,
  updateDoc,
  DocumentSnapshot,
  DocumentData,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../services/firebase";
import toast from "react-hot-toast";
import {
  AddNewJobFieldValues,
  Job,
  UserAuth,
  UserFirestoreDocData,
} from "../types";
import { generateJobID } from "../utils";

export async function getFirestoreDocumentSnapshot(userEmail: string) {
  const docRef = doc(db, "users", userEmail);
  const docSnap = await getDoc(docRef);

  return docSnap;
}

export async function isFirstAccessUser(
  docSnap: DocumentSnapshot<DocumentData>
) {
  if (docSnap.exists()) {
    const docData = docSnap.data() as UserFirestoreDocData;
    const docProfile = docData.profile;

    return Object.keys(docProfile).length == 0;
  }
}

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

        return "firstAccess";
      } else {
        return "normalAccess";
      }
    }
  } catch (error) {
    console.error("Error adding document: ", error);
    toast.error("Erro ao tentar criar base de dados para este usuário..!");
  }
}

export async function addJob(
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
              markedAsDone: false,
              completionDate: null,
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

export async function removeJob(user: UserAuth, job: Job) {
  if (user?.email) {
    const docRef = doc(db, "users", user.email);

    await updateDoc(docRef, {
      jobs: arrayRemove(job),
    }).catch((error) => console.error(error));
  }
}

export async function editJob(
  user: UserAuth,
  allJobs: Job[],
  currentJob: Job,
  newValues: AddNewJobFieldValues
) {
  if (allJobs) {
    const updatedJobs = allJobs.map((job) => {
      if (job.id === currentJob.id) {
        return {
          ...job,
          title: newValues.title,
          dailyHours: Number(newValues.dailyHours),
          totalHours: Number(newValues.totalHours),
        };
      } else {
        return job;
      }
    });

    if (user?.email) {
      const docRef = doc(db, "users", user.email);

      await updateDoc(docRef, {
        jobs: updatedJobs,
      });
    }
  }
}

export async function markJobAsDone(
  user: UserAuth,
  allJobs: Job[],
  currentJob: Job,
) {
  if (allJobs) {
    const updatedJobs = allJobs.map((job) => {
      if (job.id === currentJob.id) {
        return {
          ...job,
          markedAsDone: true,
          completionDate: Timestamp.now(),
        };
      } else {
        return job;
      }
    });

    if (user?.email) {
      const docRef = doc(db, "users", user.email);

      await updateDoc(docRef, {
        jobs: updatedJobs,
      });
    }
  }
}
