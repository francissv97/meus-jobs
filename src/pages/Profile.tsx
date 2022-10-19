import { Divider, Form, InputNumber, message } from "antd";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FloppyDisk, PencilSimpleLine } from "phosphor-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { SimpleHeader } from "../components/SimpleHeader";
import { useAuth } from "../hooks/useAuth";
import { db } from "../services/firebase";
import { ProfileFieldValues } from "../types";

export function Profile() {
  const [valueHour, setValueHour] = useState<number>();
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const { user } = useAuth();
  const [form] = Form.useForm();

  async function handleProfileForm() {
    const fieldValues = form.getFieldsValue() as ProfileFieldValues;

    await setProfileNewValues(fieldValues);
    // calcular valor hora com esse dados
    // mostrar valor hora atualizado
  }

  async function setProfileNewValues(profileValues: ProfileFieldValues) {
    if (user?.email) {
      const docRef = doc(db, "users", user.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        try {
          await updateDoc(docRef, { profile: profileValues });
          toast.success("Valores atualizados..!!");
        } catch (error) {
          console.log(error);
          toast.error("Erro ao tentar atualizar valores do perfil.");
        }
      }
    }
  }

  return (
    <div className="bg-gradient-to-t from-zinc-400 via-zinc-300 to-zinc-200 min-h-screen">
      <SimpleHeader />

      <div className="flex gap-2 max-w-4xl p-4 mx-auto mt-6">
        <div className="flex flex-col gap-4 justify-center items-center bg-zinc-100 shadow-xl w-40 md:w-64 rounded p-4 h-fit">
          <img
            src={user?.avatar}
            alt="Profile photo"
            className="w-36 rounded-full"
            referrerPolicy="no-referrer"
          />

          <span className="text-lg md:text-xl font-normal">{user?.name}</span>

          {valueHour && (
            <>
              <Divider className="my-2" />
              <div className="flex flex-col items-center">
                <span className="text-base text-zinc-600">Valor hora</span>
                <strong className="font-medium text-xl text-zinc-700">
                  {valueHour}
                </strong>
              </div>
            </>
          )}

          <Divider className="my-2" />

          {isFormDisabled && (
            <button
              onClick={() => setIsFormDisabled(false)}
              className="flex items-center gap-1 bg-sky-600 rounded p-2 mb-2 self-center text-zinc-100 transition hover:bg-sky-700"
            >
              <PencilSimpleLine size={22} />
              Editar
            </button>
          )}

          <button
            disabled={isFormDisabled}
            onClick={() => form.submit()}
            className="flex items-center justify-center gap-1 w-full text-xl p-2 rounded border-2 border-transparent text-zinc-100 bg-green-600 hover:bg-zinc-100 hover:border-green-600 hover:text-green-600 disabled:bg-zinc-400 disabled:cursor-not-allowed disabled:hover:border-transparent disabled:hover:text-zinc-100 transition"
          >
            <FloppyDisk size={30} />
            Salvar
          </button>
        </div>

        <div className="flex-1 flex flex-col px-4 pt-0 pb-4">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleProfileForm}
            onFinishFailed={() => message.error("erro.")}
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
        </div>
      </div>
    </div>
  );
}
