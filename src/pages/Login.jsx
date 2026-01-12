import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

import { Button, Form, Input } from "antd";

export const Login = () => {
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    await login(values);
    navigate("/");
  };

  return (
    <div className="form-wrap">
      <Form onFinish={onFinish} initialValues={{ variant: "underlined" }}>

        <h1>Вход</h1>
        <br />
        <Form.Item
          layout="vertical"
          label="Email"
          name="email"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          layout="vertical"
          label="Пароль"
          name="password"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
