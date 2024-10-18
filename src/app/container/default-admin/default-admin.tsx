import {
  Avatar,
  Button,
  Col,
  Layout,
  Menu,
  Popover,
  Row,
  Select,
  theme,
} from "antd";
import {Outlet, useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { MenuDashboard } from "../../modules/admin/constance/menu-dashboard";
import useUserName from "../../api/useUserName";
import { useTranslation } from "react-i18next";

const { Header, Sider, Content } = Layout;

const DefaultAdmin = () => {
  const { i18n } = useTranslation();
  const { t: tHeader } = useTranslation("translation", { keyPrefix: "header" });
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const dataUser = useUserName();
  const navigate = useNavigate();

  const handClickMenuDashboard = (data: any) => {
    navigate(data.key);
  };

  const changeLanguage = (lng: any) => {
    i18n.changeLanguage(lng);
  };

  function handleLogout(key: any) {
    localStorage.removeItem("jwtToken");
    localStorage.setItem("isLoginToken", "false");
    navigate(key);
    window.location.reload();
  }

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/admin"]}
          items={MenuDashboard()}
          onSelect={handClickMenuDashboard}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Row
            align="middle"
            style={{ flex: 1, justifyContent: "flex-end", marginRight: "50px" }}
          >
            <Col xl={4} xxl={2}>
              <Select
                onChange={changeLanguage}
                value={i18n.language}
                options={[
                  { value: "en", label: "English" },
                  { value: "vi", label: "Tiếng Việt" },
                ]}
                style={{ width: 100 }}
                size="small"
              />
            </Col>
            <Col>
              <Popover
                content={
                  <div>
                    <div
                      className="pointer"
                      onClick={() => handleLogout("/login")}
                    >
                      {tHeader("Logout")}
                    </div>
                  </div>
                }
                title={
                  <div>
                    <Avatar
                      size="small"
                      icon={<UserOutlined />}
                      style={{ marginRight: 10 }}
                    />
                    {dataUser?.email}
                  </div>
                }
              >
                <Avatar size={35} icon={<UserOutlined />} className="pointer" />
              </Popover>
            </Col>
            <Col style={{ marginLeft: "10px" }}>{dataUser?.name}</Col>
          </Row>
        </Header>
        <Content
          style={{
            margin: "0 16px",
            marginBottom: "24px",
            padding: 24,
            minHeight: 280,
            overflowY: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultAdmin;