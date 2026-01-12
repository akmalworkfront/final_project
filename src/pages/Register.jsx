import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";

export const Register = () => {
  const { register, isLoading } = useAuthStore();
  const navigate = useNavigate("");

  const onFinish = async (values) => {
    await register(values);
    navigate("/login");
  };

  return (
    <div className="form-wrap">
    <Form
      onFinish={onFinish}
      initialValues={{ variant: "underlined" }}
    >
      <h1>Регистрация</h1>
      <br />

      <Form.Item
        layout="vertical"
        label="Username"
        name="username"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      
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
        label="Password"
        name="password"
        rules={[{ required: true }]}
      >
        <Input.Password />
      </Form.Item>


       <Form.Item label={null}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Зарегистрироваться
          </Button>
        </Form.Item>


    </Form>
   </div>
  );
};
