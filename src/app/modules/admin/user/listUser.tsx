import { Alert, Button, Col, Form, Input, Modal, Row, Spin } from "antd";
import { ListUserTable } from "./components/listUserTable";
import { deleteUser, editUser, useAddUser, useGetUser } from "./user.loader";
import { useState } from "react";

export const ListUser = () => {
  const [form] = Form.useForm();
  const [pageReportUserHistory, setPageReportUserHistory] = useState(1);
  const [pageLimitUser, setPageLimitUser] = useState(10);
  const [emailSearch, setEmailSearch] = useState("");
  const [isActionAdd, setIsActionAdd] = useState(true);
  const [userSelected, setUserSelected] = useState({} as any);
  const [isModalAddAndEditUser, setIsModalAddAndEditUser] = useState(false);
  const [isModalDeleteUser, setIsModalDeleteUser] = useState(false);
  const { data: dataUser, isLoading: isLoadingDataUser } = useGetUser({
    page: pageReportUserHistory,
    limit: pageLimitUser,
    email: emailSearch,
  });
  const { mutate: mutateAddUser, isLoading: isLoadingAddUser } = useAddUser();
  const { mutate: mutateEditUser, isLoading: isLoadingEditUser } = editUser();
  const { mutate: mutateDeleteUser, isLoading: isLoadingDeleteUser } =
    deleteUser();
  const handleSearch = (data: any) => {
    if (data === "") {
      setEmailSearch("");
    } else {
      setEmailSearch(data);
    }
  };

  const handleOkDeleteUser = () => {
    mutateDeleteUser(userSelected?.id);
    setIsModalDeleteUser(false);
  }

  const handleCancelDeleteUser = () => {
    setIsModalDeleteUser(false)
  }

  const handleCancelModalAddAndEditCategory = () => {
    setIsModalAddAndEditUser(false);
    form.resetFields();
  };

  const handleOkAddUser = () => {
    form
      .validateFields()
      .then((values) => {
        const formData = new FormData();
        formData.append("name", values?.name || "");
        formData.append("email", values?.email || "");
        formData.append("password", values?.password || "");
        mutateAddUser(formData);
        setIsModalAddAndEditUser(false);
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log("Validate Failed:", errorInfo);
      });
  };
  const handleOkEditUser = () => {
    form
      .validateFields()
      .then((values) => {
        const formData = new FormData();
        formData.append("id", userSelected?.id || "");
        formData.append("name", values?.name || "");
        formData.append("email", values?.email || "");
        formData.append("password", values?.password || "");
        mutateEditUser(formData);
        setIsModalAddAndEditUser(false);
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log("Validate Failed:", errorInfo);
      });
  };
  const showModalAddUser = () => {
    setIsActionAdd(true);
    setIsModalAddAndEditUser(true);
  };
  return (
    <>
      <Row>
        <Col span={24} xxl={24} xl={24}>
          <Row justify={"space-between"}>
            <Col>
              <span className="titleMainDashboard">USERS</span>{" "}
            </Col>
            <Col>
              <Row gutter={[10, 0]}>
                <Col>
                  <Input.Search
                    placeholder="Search email"
                    enterButton
                    onSearch={handleSearch}
                    style={{ width: 300 }}
                  />
                </Col>
                <Col>
                  <Button type="primary" onClick={showModalAddUser}>
                    ADD USER
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row
            justify={"space-between"}
            style={{
              marginTop: "30px",
            }}
            gutter={[0, 30]}
          >
            <Col
              xl={24}
              xs={24}
              style={{ backgroundColor: "#fff", padding: "30px" }}
            >
              <Row justify={"space-between"} gutter={[0, 40]}>
                <>
                  <ListUserTable
                    data={dataUser?.auths ?? []}
                    isLoading={isLoadingDataUser}
                    totalPage={dataUser?.total_pages}
                    setPageReportUserHistory={setPageReportUserHistory}
                    setPageLimitUser={setPageLimitUser}
                    pageReportUserHistory={pageReportUserHistory}
                    pageLimitUser={pageLimitUser}
                    form={form}
                    setIsActionAdd = {setIsActionAdd}
                    setIsModalDeleteUser = {setIsModalDeleteUser}
                    setUserSelected={setUserSelected}
                    setIsModalAddAndEditUser={setIsModalAddAndEditUser}
                  />
                </>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* Modal loading */}
      <Modal
        open={isLoadingAddUser}
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
      {/* Modal delete */}
      <Modal
        title="DeleteCustomer"
        open={isModalDeleteUser}
        onOk={handleOkDeleteUser}
        onCancel={handleCancelDeleteUser}
      >
        <Alert
          message={
            <p>
              Are you sure you want to delete the category "
              <b>{userSelected?.name}"</b> ?
            </p>
          }
          type="error"
          showIcon
        />
      </Modal>
      <Modal
        visible={isModalAddAndEditUser || isLoadingEditUser || isLoadingDeleteUser}
        title={isActionAdd ? "Add user" : "Edit user"}
        onCancel={handleCancelModalAddAndEditCategory}
        onOk={isActionAdd ? handleOkAddUser : handleOkEditUser}
      >
        <Form form={form} layout="vertical" autoComplete="off">
          <Col>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please enter name",
                },
              ]}
            >
              <Input placeholder="Enter name" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please enter email",
                },
              ]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please enter password",
                },
              ]}
            >
              <Input placeholder="Enter password" />
            </Form.Item>
          </Col>
        </Form>
      </Modal>
    </>
  );
};
