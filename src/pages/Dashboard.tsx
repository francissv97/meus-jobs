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
import { CircleNotch, SmileyWink } from "phosphor-react";
import { calculateJobDeadline } from "../utils";

export function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<Job[]>();
  const [profileData, setProfileData] = useState<ProfileType>();
  const [jobsTotal, setJobsTotal] = useState(0);
  const [jobsInProgress, setJobsInProgress] = useState(0);
  const [jobsFinalizeds, setJobsFinalizeds] = useState(0);

  async function removeJob(jobId: string, allJobs: Job[]) {
    if (user?.email) {
      const filteredJobs = allJobs.filter((job) => job.id != jobId);

      const docRef = doc(db, "users", user.email);

      await updateDoc(docRef, {
        jobs: filteredJobs,
      }).catch((error) => console.error(error));
    }
  }

  async function calcNumbers(jobs: Job[]) {
    if (jobs) {
      jobs.forEach((j) => {
        const deadline = calculateJobDeadline(
          j.dailyHours,
          j.totalHours,
          j.createdAt
        );

        if (deadline > 0) {
          const counter = jobsInProgress + 1;
          setJobsInProgress(counter);
        } else {
          const counter = jobsFinalizeds + 1;
          setJobsInProgress(counter);
        }
      });
    }
  }

  // jobs && calcNumbers(jobs);

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
                navigate("/profile");
                toast(
                  "Primeiro acesso ao App. Por favor, preencha os dados do perfil para começar a adicionar jobs.",
                  { duration: 4000 }
                );
              }
            }
          }
        } catch (error) {
          console.log(error);
        }
      }

      user && getUserDoc(user);

      const unsub = onSnapshot(doc(db, "users", user.email), (doc) => {
        const data = doc.data() as UserFirestoreDocData;

        setJobs(data.jobs);

        setJobsTotal(data.jobs.length);
      });

      return unsub;
    }
  }, []);

  return (
    <div className="flex flex-col bg-gradient-to-t from-zinc-400 via-zinc-300 to-zinc-200 min-h-screen">
      <Header
        totalJobs={jobsTotal}
        inProgressJobs={jobsInProgress}
        finalizedsJobs={jobsFinalizeds}
      />

      <div className="flex flex-col gap-4 mt-4 max-w-4xl mx-auto -translate-y-12 w-full px-4">
        {!jobs ? (
          <Spin
            size="large"
            indicator={<CircleNotch className="text-zinc-500 animate-spin" />}
          />
        ) : jobs.length > 0 ? (
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
        ) : (
          <strong className="text-zinc-600 text-2xl font-normal flex items-center gap-2">
            <SmileyWink size={42} weight="light" className="text-orange-500" />
            Nenhum job registrado por enquanto
          </strong>
        )}
      </div>

      <Footer className="mt-auto" />
    </div>
  );
}
