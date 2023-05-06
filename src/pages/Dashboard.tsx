import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";
import { Spin } from "antd";
import toast from "react-hot-toast";
import {
  getFirestoreDocumentSnapshot,
  isFirstAccessUser,
} from "../services/firestore";
import { useAllJobs } from "../hooks/useAllJobs";
import { Header } from "../components/Header";
import { JobCard } from "../components/JobCard";
import { JobHunting } from "../components/JobHunting";
import { Footer } from "../components/Footer";
import { Job, ProfileType, UserAuth, UserFirestoreDocData } from "../types";
import { CircleNotch } from "phosphor-react";

export function Dashboard() {
  const [profileData, setProfileData] = useState<ProfileType>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { allJobs, setAllJobs } = useAllJobs();

  useEffect(() => {
    if (user?.email) {
      async function getUserDoc(user: UserAuth) {
        try {
          if (user.email) {
            const docSnap = await getFirestoreDocumentSnapshot(user.email);

            if (docSnap.exists()) {
              const docData = docSnap.data() as UserFirestoreDocData;
              setProfileData(docData.profile);
              const isFirstAccess = await isFirstAccessUser(docSnap);

              if (isFirstAccess) {
                toast(
                  "Primeiro acesso ao App. Por favor, preencha os dados do perfil para começar a adicionar jobs.",
                  { duration: 4000, id: "#0" }
                );
                return navigate("/profile");
              }
            }
          }
        } catch (error) {
          console.error(error);
        }
      }

      getUserDoc(user);

      const unsub = onSnapshot(doc(db, "users", user.email), (doc) => {
        const data = doc.data() as UserFirestoreDocData;

        if (data) {
          setAllJobs(
            data.jobs.sort(
              (a: Job, b: Job) =>
                b.createdAt.toMillis() - a.createdAt.toMillis()
            )
          );
        }
      });

      return unsub;
    }
  }, []);

  return (
    <div className="flex flex-col bg-gradient-to-t from-zinc-600 via-zinc-300 to-zinc-100 min-h-screen">
      <Header jobs={allJobs} profileHoursPerDay={profileData?.hoursPerDay} />

      <div className="flex flex-1 flex-col gap-4 mt-4 max-w-4xl mx-auto -translate-y-12 w-full px-4">
        {!allJobs ? (
          <Spin
            size="large"
            indicator={<CircleNotch className="text-zinc-500 animate-spin" />}
          />
        ) : (
          allJobs.length > 0 &&
          allJobs.map((job) => (
            <JobCard key={job.id} job={job} profileData={profileData} />
          ))
        )}
      </div>

      {allJobs?.length == 0 ? (
        <div className="flex flex-col items-center">
          <span className="text-zinc-600 font-medium text-xl md:text-2xl mx-2 mt-2">
            Nenhum job por enquanto...
          </span>

          <JobHunting />
        </div>
      ) : (
        <Footer className="text-zinc-300 pb-2" />
      )}
    </div>
  );
}
