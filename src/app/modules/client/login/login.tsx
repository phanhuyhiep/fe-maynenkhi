import { Col, Form, Input, Button, Row, Modal, Spin } from "antd";
import "./login.css";
import { useLogin } from "./login.loader";
// import { useMutationLogin } from "./login.loader";

export const Login: React.FC = () => {
  const [form] = Form.useForm();
  const { mutate: mutateLogin, isLoading: isLoadingLogin } = useLogin();
  const onFinish = () => {
    form
      .validateFields()
      .then((values) => {
        const formData = new FormData();
        formData.append("email", values?.email || "");
        formData.append("password", values?.password || "");
        form.resetFields();
        mutateLogin(formData);
      })
      .catch((errorInfo) => {
        console.log("Validate Failed:", errorInfo);
      });
    
  };
  return (
    <div>
      {/* Modal loading */}
      <Modal
        open={isLoadingLogin}
        footer={false}
        closable={false}
        centered={true}
      >
        <Col span={24}>
          <Row justify={"center"}>
            <h1></h1>
          </Row>
          <Row justify={"center"}>
            <Spin />
          </Row>
        </Col>
      </Modal>
      <div className="col-bgr"></div>
      <Col xxl={24} xl={24} xs={12}>
        <Row justify={"center"}>
          <Form
            form={form}
            layout="vertical"
            autoComplete="off"
            onFinish={onFinish}
            className="form-complain-login"
          >
            <Row justify={"center"}>
              <div className="font-middle title-login">Đăng nhập</div>
            </Row>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Hãy nhập email !" }]}
            >
              <Input
                className="inputRegister"
                placeholder="Email"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Hãy nhập password !" }]}
            >
              <Input.Password
                className="inputRegister"
                placeholder="Password"
                size="large"
              />
            </Form.Item>

            <Row justify={"space-between"} className="routerLogin"></Row>
            <Row justify={"center"}>
              <Button size="large" type="primary" htmlType="submit">
                Đăng nhập
              </Button>
            </Row>
          </Form>
        </Row>
      </Col>
    </div>
  );
};
