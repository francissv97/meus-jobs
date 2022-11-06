import { Modal, Form, Input } from "antd";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { addNewJob } from "../hooks/useFirestore";
import { AddNewJobFieldValues } from "../types";
import { FloppyDisk } from "phosphor-react";

interface Props {
  open: boolean;
  closeModal: () => void;
}

export function AddNewJobModal({ open, closeModal }: Props) {
  const { user } = useAuth();
  const [form] = Form.useForm();

  async function handleSubmitNewJob() {
    const { title, dailyHours, totalHours } =
      form.getFieldsValue() as AddNewJobFieldValues;

    if (user) {
      addNewJob(user, title, dailyHours, totalHours)
        .then(() => handleClose())
        .catch((error) => {
          console.log(error);
          toast.error("Erro ao tentar adicionar Job.");
        });
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
      title="Adicionar Novo Job"
      footer={null}
      destroyOnClose
    >
      <Form
        form={form}
        onFinish={handleSubmitNewJob}
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
