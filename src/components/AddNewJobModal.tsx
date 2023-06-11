import { Modal, Form, Input } from "antd";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { addJob } from "../services/firestore";
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
    try {
      const { title, dailyHours, totalHours } = form.getFieldsValue() as AddNewJobFieldValues;

      if (user) {
        await addJob(user, title, dailyHours, totalHours);
        handleClose();
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao tentar adicionar Job.");
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
      bodyStyle={{ padding: 16, backgroundColor: "#f2f2f2" }}
      width={864}
      maskStyle={{ backdropFilter: "blur(2px)" }}
      style={{ paddingInline: "8px" }}
      footer={null}
      destroyOnClose
    >
      <Form form={form} className="flex flex-col" layout="vertical">
        <Form.Item
          label="Título"
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
          onClick={handleSubmitNewJob}
          className="flex items-center w-fit self-end justify-center gap-1 rounded bg-emerald-600 hover:bg-emerald-700 transition text-xl px-4 py-2 text-zinc-100"
        >
          <FloppyDisk size={32} />
          Salvar
        </button>
      </Form>
    </Modal>
  );
}
