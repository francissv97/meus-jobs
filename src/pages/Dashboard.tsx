import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";
import {
  getFirestoreDocumentSnapshot,
  isFirstAccessUser,
} from "../hooks/useFirestore";
import toast from "react-hot-toast";
import { Spin } from "antd";
import { Job, ProfileType, UserAuth, UserFirestoreDocData } from "../types";
import { Header } from "../components/Header";
import { JobCard } from "../components/JobCard";
import { Footer } from "../components/Footer";
import { CircleNotch } from "phosphor-react";
import { useJobs } from "../hooks/useJobs";
import { JobHunting } from "../components/JobHunting";

export function Dashboard() {
  const [profileData, setProfileData] = useState<ProfileType>();
  const navigate = useNavigate();

  const { user } = useAuth();
  const { jobs, setJobs } = useJobs();

  async function removeJob(jobId: string, allJobs: Job[]) {
    if (user?.email) {
      const filteredJobs = allJobs.filter((job) => job.id != jobId);

      const docRef = doc(db, "users", user.email);

      await updateDoc(docRef, {
        jobs: filteredJobs,
      }).catch((error) => console.error(error));
    }
  }

  useEffect(() => {
    if (user?.email) {
      async function getUserDoc(user: UserAuth) {
        try {
          if (user.email) {
            const docSnap = await getFirestoreDocumentSnapshot(user.email);

            if (docSnap.exists()) {
              const docData = docSnap.data() as UserFirestoreDocData;
              const docProfile = docData.profile;

              setProfileData(docProfile);

              const isFirstAccess = await isFirstAccessUser(docSnap);
              if (isFirstAccess) {
                toast(
                  "Primeiro acesso ao App. Por favor, preencha os dados do perfil para começar a adicionar jobs.",
                  { duration: 4000 }
                );
                return navigate("/profile");
              }
            }
          }
        } catch (error) {
          console.log(error);
        }
      }

      getUserDoc(user);

      const unsub = onSnapshot(doc(db, "users", user.email), (doc) => {
        const data = doc.data() as UserFirestoreDocData;

        setJobs(
          data.jobs.sort(
            (a: Job, b: Job) => a.createdAt.toMillis() - b.createdAt.toMillis()
          )
        );
      });

      return unsub;
    }
  }, []);

  return (
    <div className="flex flex-col bg-gradient-to-t from-zinc-600 via-zinc-200 to-zinc-200 min-h-screen">
      <Header jobs={jobs} profileHoursPerDay={profileData?.hoursPerDay} />

      <div className="flex flex-col gap-4 mt-4 max-w-4xl mx-auto -translate-y-12 w-full px-4">
        {!jobs ? (
          <Spin
            size="large"
            indicator={<CircleNotch className="text-zinc-500 animate-spin" />}
          />
        ) : (
          jobs.length > 0 &&
          jobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              title={job.title}
              dailyHours={job.dailyHours}
              totalHours={job.totalHours}
              createdAt={job.createdAt}
              profileData={profileData}
              onClickRemoveJob={() => removeJob(job.id, jobs)}
            />
          ))
        )}
      </div>

      {jobs?.length == 0 && (
        <div className="flex flex-col items-center">
          <span className="absolute z-10 text-zinc-700 text-xl md:text-2xl mx-2">
            Nenhum job por enquanto.:
          </span>

          <JobHunting className="max-w-md mx-auto absolute bottom-0 left-0 right-0" />
        </div>
      )}

      <Footer className="absolute mt-auto bottom-0 left-0 right-0 text-zinc-300" />
    </div>
  );
}
