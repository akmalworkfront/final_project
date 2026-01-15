import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useCategoryStore } from "../store/categoryStore";
import {
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Input,
  List,
  Row,
  Space,
  Spin,
  Typography,
} from "antd";

import { PlusOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
const { Paragraph, Title } = Typography;

export const Profile = () => {
  const { getProfile, profile, logout } = useAuthStore();
  const { categories, getCategories, createCategory } = useCategoryStore();

  const [title, setTitle] = useState("");

  useEffect(() => {
    getProfile();
    getCategories();
    //  if(!isAuth){
    //   navigate("/login");
    // }
  }, []);

  if (!profile) {
    return <Spin fullscreen tip="Загрузка профиля..." />;
  }

  const submit = (e) => {
    e.preventDefault();
    if (!title) return;
    createCategory(title);
    setTitle("");
  };

  return (
    <div style={{ padding: "30px", background: "#e7ebf1ff", minHeight: "100vh" }}>
      <Row gutter={[24, 24]} justify="center">
        <Col xs={24} md={8}>
          <Card variant="outlined" style={{ textAlign: "center" }}>
            
            <Title level={3} style={{ marginTop: 15 }}></Title>
            <Paragraph type="secondary">Пользователь</Paragraph>

            <Divider />

            <Descriptions column={1} size="small">
              <Descriptions.Item label="Email">
                <Typography.Text copyable>{profile.email}</Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item label="Логин">{profile.username}</Descriptions.Item>
            </Descriptions>

            <Divider />

            <Button 
              danger 
              block 
              icon={<LogoutOutlined />} 
              onClick={logout}
              style={{ marginTop: 10 }}
            >
              Выйти из аккаунта
            </Button>

          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Список категорий" variant="outlined">
            <Space.Compact style={{ width: "100%", marginBottom: 20 }}>
              <Input
                placeholder="Название новой категории"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onPressEnter={submit}
              />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={submit}
              >
                Создать
              </Button>
            </Space.Compact>

            <List
              header={<div>Всего категорий: {categories.length}</div>}
              bordered
              dataSource={categories}
              renderItem={(cat) => (
                <List.Item>
                  <Typography.Text strong>{cat.title}</Typography.Text>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
