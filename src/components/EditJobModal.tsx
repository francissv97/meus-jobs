import { Modal, Form, Input } from "antd";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";
import { AddNewJobFieldValues, Job } from "../types";
import { useJobs } from "../hooks/useJobs";
import { FloppyDisk } from "phosphor-react";

interface Props {
  open: boolean;
  closeModal: () => void;
  id: string;
  title: string;
  dailyHours: number;
  totalHours: number;
}

export function EditJobModal({
  open,
  closeModal,
  id,
  title,
  dailyHours,
  totalHours,
}: Props) {
  const { user } = useAuth();
  const { jobs } = useJobs();
  const [form] = Form.useForm();

  async function handleSubmitEditJob() {
    if (jobs) {
      const { title, dailyHours, totalHours } =
        form.getFieldsValue() as AddNewJobFieldValues;

      const jobToBeEdited = jobs.find((job) => job.id == id);
      const remainingJobs = jobs.filter((job) => job.id != id);

      if (jobToBeEdited && remainingJobs) {
        jobToBeEdited.title = title;
        jobToBeEdited.dailyHours = Number(dailyHours);
        jobToBeEdited.totalHours = Number(totalHours);

        remainingJobs.push(jobToBeEdited);

        remainingJobs.sort(
          (a: Job, b: Job) => a.createdAt.toMillis() - b.createdAt.toMillis()
        );

        if (user?.email) {
          const docRef = doc(db, "users", user.email);

          await updateDoc(docRef, {
            jobs: remainingJobs,
          });

          handleClose();
        }
      }
    }
  }

  function handleClose() {
    closeModal();
    form.resetFields();
  }

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      title="Editar Job"
      footer={null}
      destroyOnClose
    >
      <Form
        form={form}
        onFinish={handleSubmitEditJob}
        initialValues={{
          title: title,
          dailyHours: dailyHours,
          totalHours: totalHours,
        }}
        className="flex flex-col"
        layout="vertical"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Campo obrigatório." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Quantas horas por dia vai dedicar ao este job?"
          name="dailyHours"
          rules={[{ required: true, message: "Campo obrigatório." }]}
        >
          <Input type="number" max={24} min={0} />
        </Form.Item>

        <Form.Item
          label="Estimativa de horas totais ao job"
          name="totalHours"
          rules={[{ required: true, message: "Campo obrigatório." }]}
        >
          <Input type="number" min={0} />
        </Form.Item>

        <button
          key={0}
          type="submit"
          onClick={() => form.submit()}
          className="flex items-center w-fit self-end justify-center gap-1 rounded bg-emerald-600 hover:bg-emerald-700 transition text-xl px-4 py-2 text-zinc-100"
        >
          <FloppyDisk size={32} />
          Salvar
        </button>
      </Form>
    </Modal>
  );
}
