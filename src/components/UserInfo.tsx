import { Button, Popover } from "antd";
import {
  CaretDownOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";

interface Props {
  name: string;
  avatar: string;
}

const popoverContent = (
  <div className="m-0 flex flex-col gap-2">
    <Button
      className="flex items-center justify-center text-base"
      icon={<UserOutlined className="text-lg" />}
    >
      Perfil
    </Button>
    <Button
      danger
      className="flex items-center justify-center text-base"
      icon={<LogoutOutlined className="text-lg" />}
    >
      Logout
    </Button>
  </div>
);

export function UserInfo({ name, avatar }: Props) {
  return (
    <Popover
      content={popoverContent}
      placement="bottomLeft"
      title={name}
      className="flex gap-1 items-center justify-center cursor-pointer"
    >
      <img
        src={avatar}
        alt={name}
        referrerPolicy="no-referrer"
        className="w-10 rounded-full"
      />

      <CaretDownOutlined className="text-zinc-300" />
    </Popover>
  );
}
