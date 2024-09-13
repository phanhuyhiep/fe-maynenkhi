import { Alert, Button, Col, Form, Input, Modal, Row, Spin } from "antd";
import {
  useAddCategory,
  useDeleteCategory,
  useEditCategory,
  useGetCategory,
} from "./category.loader";
import { ListCategoryTable } from "./components/listCategoryTable";
import { useEffect, useState } from "react";

const ListCategory = () => {
  const [form] = Form.useForm();
  const [pageReportCategoryHistory, setPageReportCategoryHistory] = useState(1);
  const [pageLimitCategory, setPageLimitCategory] = useState(10);
  const [categorySelected, setCategorySelected] = useState({} as any);
  const [isModalDeleteCategory, setIsModalDeleteCategory] = useState(false);
  const [isModalAddAndEditCategory, setIsModalAddAndEditCategory] =
    useState(false);
  const [isActionAdd, setIsActionAdd] = useState(true);
  const { data: dataCategory, isLoading: isLoadingDataCategory } =
    useGetCategory({
      page: pageReportCategoryHistory,
      limit: pageLimitCategory,
    });
  useEffect(() => {
    if (dataCategory?.categories.length === 0) {
      setPageReportCategoryHistory(pageReportCategoryHistory - 1 );
    }
  }, [dataCategory?.categories]);
  const { mutate: mutateDeleteCategoty, isLoading: isLoadingDeleteCategory } =
    useDeleteCategory();
  const { mutate: mutateAddCategory, isLoading: isLoadingAddCategory } =
    useAddCategory();
  const {mutate: mutateEditCategory, isLoading: isLoadingEditCategory} = useEditCategory()
  const handleDeleteCategory = () => {
    mutateDeleteCategoty(categorySelected?.id);
    setIsModalDeleteCategory(false);
  };
  const handleCancelModal = () => {
    setIsModalDeleteCategory(false);
  };
  const handleCancelModalAddAndEditCategory = () => {
    setIsModalAddAndEditCategory(false);
    form.resetFields();
  };
  const showModalAddCategory = () => {
    setIsActionAdd(true);
    setIsModalAddAndEditCategory(true);
  };
  const handleOkAddCategory = () => {
    form
      .validateFields()
      .then((values) => {
        const formData = new FormData();
        formData.append("name", values?.name || "");
        mutateAddCategory(formData);
        setIsModalAddAndEditCategory(false);
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log("Validate Failed:", errorInfo);
      });
  };
  const handleOkEditCategory = () => {
    form
      .validateFields()
      .then((values) => {
        const formData = new FormData();
        formData.append("id", categorySelected?.id || "");
        formData.append("name", values?.name || "");
        mutateEditCategory(formData);
        setIsModalAddAndEditCategory(false);
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log("Validate Failed:", errorInfo);
      });
  };
  const handleChFormatUpperCase = (e:any) => {
    const value = e.target.value.toUpperCase();
    form.setFieldsValue({ name: value });
  };
  return (
    <>
      <Row>
        <Col span={24} xxl={24} xl={24}>
          <Row justify={"space-between"}>
            <Col>
              <span className="titleMainDashboard">CATEGORIES</span>{" "}
            </Col>
            <Col>
              <Row gutter={[10, 0]}>
                <Col>
                  <Button type="primary" onClick={showModalAddCategory}>
                    ADD CATEGORY
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
                  <ListCategoryTable
                    setPageReportCategoryHistory={setPageReportCategoryHistory}
                    setPageLimitCategory={setPageLimitCategory}
                    setCategorySelected={setCategorySelected}
                    pageLimitCategory = {pageLimitCategory}
                    form = {form}
                    setIsModalDeleteCategory={setIsModalDeleteCategory}
                    pageReportCategoryHistory={pageReportCategoryHistory}
                    data={dataCategory?.categories ?? []}
                    isLoading={isLoadingDataCategory}
                    setIsActionAdd = {setIsActionAdd}
                    setIsModalAddAndEditCategory = {setIsModalAddAndEditCategory}
                    totalPage={dataCategory?.total_pages ?? 0}
                  />
                </>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* Modal loading */}
      <Modal
        open={isLoadingDeleteCategory || isLoadingAddCategory || isLoadingEditCategory}
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
        open={isModalDeleteCategory}
        onOk={handleDeleteCategory}
        onCancel={handleCancelModal}
      >
        <Alert
          message={
            <p>
              Are you sure you want to delete the category "
              <b>{categorySelected?.name}"</b> ?
            </p>
          }
          type="error"
          showIcon
        />
      </Modal>
      {/* Modal edit & add */}
      <Modal
        visible={isModalAddAndEditCategory}
        title={isActionAdd ? "Add category" : "Edit category"}
        onCancel={handleCancelModalAddAndEditCategory}
        onOk={isActionAdd ? handleOkAddCategory : handleOkEditCategory}
      >
        <Form form={form} layout="vertical" autoComplete="off">
          <Col>
            <Form.Item
              name="name"
              label="Category name"
              rules={[
                {
                  required: true,
                  message: "Please enter category name",
                },
              ]}
            >
              <Input placeholder="Enter category name" onChange={handleChFormatUpperCase} />
            </Form.Item>
          </Col>
        </Form>
      </Modal>
    </>
  );
};

export default ListCategory;
