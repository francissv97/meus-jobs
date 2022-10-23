import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";
import { Job, ProfileType, UserAuth, UserFirestoreDocData } from "../types";
import toast from "react-hot-toast";
import { Header } from "../components/Header";
import { JobCard } from "../components/JobCard";
import { Footer } from "../components/Footer";
import { Spin } from "antd";
import { CircleNotch } from "phosphor-react";

export function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<Job[]>();
  const [profileData, setProfileData] = useState<ProfileType>();

  useEffect(() => {
    async function getUserDoc(user: UserAuth) {
      try {
        if (user.email) {
          const docRef = doc(db, "users", user.email);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const docData = docSnap.data() as UserFirestoreDocData;
            const docProfile = docData.profile;
            const docJobs = docData.jobs;

            setProfileData(docProfile);
            setJobs(docJobs);

            const profileNotValues =
              !docProfile.daysPerWeek ||
              !docProfile.hoursPerDay ||
              !docProfile.monthlyBudget ||
              !docProfile.vacationPerYear;

            if (!docProfile || profileNotValues) navigate("/profile");
          }
        }
      } catch (error) {
        console.log(error);
        toast.error("Erro ao tentar adicionar novo job..!");
      }
    }

    user && getUserDoc(user);
  }, []);

  return (
    <div className="flex flex-col justify-between bg-gradient-to-t from-zinc-400 via-zinc-300 to-zinc-200 min-h-screen">
      <Header />

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
            />
          ))
        ) : (
          <strong className="text-zinc-600 text-2xl font-normal">
            Nenhum job registrado por enquanto.
          </strong>
        )}
      </div>

      <Footer />
    </div>
  );
}
