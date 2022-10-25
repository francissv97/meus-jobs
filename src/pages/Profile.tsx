import { useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { Divider, Form, InputNumber } from "antd";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { ProfileType, UserFirestoreDocData } from "../types";
import { SimpleHeader } from "../components/SimpleHeader";
import { calculateUserValueHour } from "../utils";
import { FloppyDisk, PencilSimpleLine } from "phosphor-react";

export function Profile() {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const [valueHour, setValueHour] = useState<number>();

  async function getProfileData() {
    if (user?.email) {
      const docRef = doc(db, "users", user.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { profile } = docSnap.data() as UserFirestoreDocData;
        const { hoursPerDay, daysPerWeek, monthlyBudget, vacationPerYear } =
          profile;

        if (daysPerWeek && hoursPerDay && monthlyBudget && vacationPerYear) {
          form.setFieldsValue({
            monthlyBudget: profile.monthlyBudget,
            hoursPerDay: profile.hoursPerDay,
            daysPerWeek: profile.daysPerWeek,
            vacationPerYear: profile.vacationPerYear,
          });

          setValueHour(
            calculateUserValueHour(
              hoursPerDay,
              daysPerWeek,
              monthlyBudget,
              vacationPerYear
            )
          );
        } else {
          setIsFormDisabled(false);
        }
      }
    }
  }

  async function handleProfileForm() {
    const { hoursPerDay, daysPerWeek, monthlyBudget, vacationPerYear } =
      form.getFieldsValue() as ProfileType;

    await handleProfileSubmitFirestore({
      hoursPerDay,
      daysPerWeek,
      monthlyBudget,
      vacationPerYear,
    });

    setValueHour(
      calculateUserValueHour(
        hoursPerDay,
        daysPerWeek,
        monthlyBudget,
        vacationPerYear
      )
    );

    setIsFormDisabled(true);
  }

  async function handleProfileSubmitFirestore(profileValues: ProfileType) {
    if (user?.email) {
      const docRef = doc(db, "users", user.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        try {
          await updateDoc(docRef, { profile: profileValues }).then(() =>
            toast.success("Valores atualizados.!")
          );
        } catch (error) {
          console.error(error);
          toast.error("Erro ao tentar atualizar valores do perfil.");
        }
      }
    }
  }

  getProfileData();

  return (
    <div className="bg-gradient-to-t from-zinc-500 via-zinc-200 to-zinc-200 min-h-screen">
      <SimpleHeader />

      <div className="flex flex-col md:flex-row gap-4 max-w-4xl p-4 mx-auto mt-6">
        <div className="flex md:flex-col gap-4 justify-center md:justify-start items-center flex-wrap">
          <div className="flex flex-col justify-center items-center gap-2 bg-zinc-100 shadow-xl rounded p-4">
            <img
              src={user?.avatar}
              alt="Profile photo"
              className="max-w-[-9rem] rounded-full"
              referrerPolicy="no-referrer"
            />

            <span className="text-lg md:text-xl font-normal">{user?.name}</span>
          </div>

          {valueHour && (
            <div className="flex flex-col items-center bg-zinc-100 shadow-xl rounded p-4 self-end md:self-center">
              <span className="text-base text-zinc-600">Valor hora</span>
              <strong className="font-normal text-2xl text-green-800">
                {valueHour.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </strong>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col px-4 pt-0 pb-4">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleProfileForm}
            autoComplete="off"
            disabled={isFormDisabled}
          >
            <Form.Item
              name="monthlyBudget"
              label="Quanto quero ganhar por mês?"
              rules={[{ required: true, message: "Este campo é obrigatório." }]}
            >
              <InputNumber
                prefix="R$"
                size="large"
                type="number"
                min={0}
                className="w-36"
              />
            </Form.Item>

            <Form.Item
              name="hoursPerDay"
              label="Quantas horas quero trabalhar por dia?"
              rules={[
                { required: true, message: "Este campo é obrigatório." },
                {
                  type: "integer",
                  message: "Valores decimais não são permitidos.",
                },
              ]}
            >
              <InputNumber size="large" type="number" min={0} max={24} />
            </Form.Item>

            <Form.Item
              name="daysPerWeek"
              label="Quantos dias quero trabalhar por semana?"
              rules={[
                { required: true, message: "Este campo é obrigatório." },
                {
                  type: "integer",
                  message: "Valores decimais não são permitidos.",
                },
              ]}
            >
              <InputNumber type="number" size="large" min={0} max={7} />
            </Form.Item>

            <Form.Item
              name="vacationPerYear"
              label="Quantas semanas por ano vocẽ quer tirar de férias?"
              rules={[
                { required: true, message: "Este campo é obrigatório." },
                {
                  type: "integer",
                  message: "Valores decimais não são permitidos.",
                },
              ]}
            >
              <InputNumber type="number" size="large" min={0} max={48} />
            </Form.Item>
          </Form>

          {isFormDisabled ? (
            <button
              onClick={() => setIsFormDisabled(false)}
              className="flex items-center gap-1 bg-sky-600 rounded w-full text-xl justify-center p-2 mb-2 self-center text-zinc-100 transition hover:bg-sky-700"
            >
              <PencilSimpleLine size={22} />
              Editar
            </button>
          ) : (
            <button
              onClick={() => form.submit()}
              className="flex items-center justify-center gap-1 w-full text-xl p-2 rounded border-2 border-transparent text-zinc-100 bg-green-600 hover:bg-zinc-100 hover:border-green-600 hover:text-green-600 disabled:bg-zinc-400 disabled:cursor-not-allowed disabled:hover:border-transparent disabled:hover:text-zinc-100 transition"
            >
              <FloppyDisk size={30} />
              Salvar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
