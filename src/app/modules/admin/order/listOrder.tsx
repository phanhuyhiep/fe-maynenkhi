import {
  Alert,
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Segmented,
  Select,
  Spin,
} from "antd";
import { useState } from "react";
import { ListOrderTable } from "./components/listOrderTable";
import {
  useAddOrder,
  useDeleteOrder,
  useEditOrder,
  useGetAllOrder,
} from "./order.loader";
import useUserName from "../../../api/useUserName";

export const ListOrder = () => {
  const dataUser = useUserName();
  const [form] = Form.useForm();
  const [orderStatus, setOrderStatus] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pageReportOderHistory, setPageReportOrderHistory] = useState(1);
  const [pageLimitOrder, setPageLimitOrder] = useState(10);
  const [selectOrder, setSelectOrder] = useState({} as any);
  const [isActionAdd, setIsActionAdd] = useState(true);
  const [isModalDeleteOrder, setIsModalDeleteOrder] = useState(false);
  const [isModalAddAndEditOrder, setIsModalAddAndEditOrder] = useState(false);
  const { data: dataOrder, isLoading: isLoadingDataOrder } = useGetAllOrder({
    page: pageReportOderHistory,
    limit: pageLimitOrder,
    order_status: orderStatus,
    searchTerm: phoneNumber,
  });
  const { mutate: mutateCreateOrder, isLoading: isLoadingCreateOrder } =
    useAddOrder();
  const { mutate: mutateEditOrder, isLoading: isLoadingEditOrder } =
    useEditOrder();
  const { mutate: mutateDeleteOrder, isLoading: isLoadingDeleteOrder } =
    useDeleteOrder();
  const handleSearch = (data: any) => {
    setPhoneNumber(data);
  };
  const handleCancelModalAddAndEditOrder = () => {
    setIsModalAddAndEditOrder(false);
    form.resetFields();
  };
  const handleCancelModal = () => {
    setIsModalDeleteOrder(false);
  };
  const handleOkAddOrder = () => {
    form
      .validateFields()
      .then((values) => {
        const formData = new FormData();
        formData.append("fullName", values?.fullName || "");
        formData.append("phoneNumber", values?.phoneNumber || "");
        formData.append("city", values?.city || "");
        formData.append("district", values?.district || "");
        formData.append("commune", values?.commune || "");
        formData.append("detailAddress", values?.detailAddress || "");
        formData.append("productName", values?.productName || "");
        formData.append("productPrice", values?.productPrice || "");
        formData.append("productQuantity", values?.productQuantity || "");
        formData.append("paymentMethods", values?.paymentMethods || "");
        formData.append("editBy", dataUser?.name || "");
        formData.append("orderStatus", values?.orderStatus || "");
        mutateCreateOrder(formData);
        setIsModalAddAndEditOrder(false);
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log("Validate Failed:", errorInfo);
      });
  };

  const handleOkEditOrder = () => {
    form
      .validateFields()
      .then((values) => {
        const formData = new FormData();
        formData.append("id", selectOrder?.id || "");
        formData.append("fullName", values?.fullName || "");
        formData.append("phoneNumber", values?.phoneNumber || "");
        formData.append("city", values?.city || "");
        formData.append("district", values?.district || "");
        formData.append("commune", values?.commune || "");
        formData.append("detailAddress", values?.detailAddress || "");
        formData.append("productName", values?.productName || "");
        formData.append("productPrice", values?.productPrice || "");
        formData.append("productQuantity", values?.productQuantity || "");
        formData.append("paymentMethods", values?.paymentMethods || "");
        formData.append("editBy", dataUser?.name || "");
        formData.append("orderStatus", values?.orderStatus || "");
        mutateEditOrder(formData);
        setIsModalAddAndEditOrder(false);
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log("Validate Failed:", errorInfo);
      });
  };
  const handleDeleteOrder = () => {
    mutateDeleteOrder(selectOrder?.id);
    setIsModalDeleteOrder(false);
  };
  const showModalAddOrderAndEditOrder = () => {
    setIsActionAdd(true);
    setIsModalAddAndEditOrder(true);
  };
  const [price, setPrice] = useState("");
  const handlePriceChange = (e: any) => {
    const { value } = e.target;
    const formattedValue = value.replace(/[^0-9]/g, "");
    setPrice(formatCurrency(formattedValue));
  };

  return (
    <>
      <Row>
        <Col span={24} xxl={24} xl={24}>
          <Row justify={"space-between"}>
            <Col>
              <span className="titleMainDashboard">ORDER</span>{" "}
            </Col>
            <Col>
              <Row gutter={[10, 0]}>
                <Col>
                  <Input.Search
                    placeholder="Search phone number"
                    enterButton
                    onSearch={handleSearch}
                    style={{ width: 300 }}
                  />
                </Col>
                <Col>
                  <Button
                    type="primary"
                    onClick={showModalAddOrderAndEditOrder}
                  >
                    ADD ORDER
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
              <Row justify="center" style={{ marginBottom: "20px" }}>
                <Segmented
                  options={[
                    { label: "All order", value: "" },
                    { label: "Pending approval", value: "Pending approval" },
                    { label: "Order received", value: "Order received" },
                    { label: "On delivery", value: "On delivery" },
                    { label: "Completed", value: "Completed" },
                    { label: "Canceled", value: "Canceled" },
                  ]}
                  onChange={(value: any) => {
                    setOrderStatus(value);
                  }}
                />
              </Row>
              <Row justify="space-between" gutter={[0, 40]}>
                <ListOrderTable
                  data={dataOrder?.orders ?? []}
                  isLoading={isLoadingDataOrder}
                  setPageReportOrderHistory={setPageReportOrderHistory}
                  pageReportOderHistory={pageReportOderHistory}
                  setPageLimitOrder={setPageLimitOrder}
                  pageLimitOrder={pageLimitOrder}
                  totalPage={dataOrder?.total_pages}
                  setSelectOrder={setSelectOrder}
                  setIsModalAddAndEditOrder={setIsModalAddAndEditOrder}
                  setIsActionAdd={setIsActionAdd}
                  setIsModalDeleteOrder={setIsModalDeleteOrder}
                  form={form}
                />
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* Modal loading */}
      <Modal
        open={
          isLoadingCreateOrder || isLoadingEditOrder || isLoadingDeleteOrder
        }
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
        title="Delete order"
        open={isModalDeleteOrder}
        onOk={handleDeleteOrder}
        onCancel={handleCancelModal}
      >
        <Alert
          message={
            <p>
              Are you sure you want to delete the order "
              <b>{selectOrder?.orderCode}"</b> ?
            </p>
          }
          type="error"
          showIcon
        />
      </Modal>
      {/* Modal add & edit */}
      <Modal
        visible={isModalAddAndEditOrder}
        title={isActionAdd ? "Create Order" : "Edit order"}
        onCancel={handleCancelModalAddAndEditOrder}
        onOk={isActionAdd ? handleOkAddOrder : handleOkEditOrder}
        width={600}
      >
        <Form
          form={form}
          name="addProduct"
          layout="vertical"
          autoComplete="off"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="fullName"
                label="Full Name"
                rules={[
                  {
                    required: true,
                    message: "Input Name",
                  },
                ]}
              >
                <Input placeholder="Enter name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phoneNumber"
                label="Phone number"
                rules={[
                  { required: true, message: "Please input your phone number" },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Phone number must be 10 digits",
                  },
                ]}
              >
                <Input placeholder="Enter phone number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="city"
                label="City"
                rules={[{ required: true, message: "Input city" }]}
              >
                <Input placeholder="Enter city" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="district"
                label="Distric"
                rules={[{ required: true, message: "Input district" }]}
              >
                <Input placeholder="Enter district" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="commune"
                label="Commune"
                rules={[{ required: true, message: "Input commune" }]}
              >
                <Input placeholder="Enter commune" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="detailAddress"
                label="Detail address"
                rules={[{ required: true, message: "Input detail address" }]}
              >
                <Input placeholder="Enter detail address" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="productName"
                label="Product name"
                rules={[{ required: true, message: "Input product name" }]}
              >
                <Input placeholder="Enter product name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="productPrice"
                label="Product price"
                rules={[
                  { required: true, message: "Input product price" },
                  {
                    pattern: /^[0-9,]+$/,
                    message: "Please input a valid price in numbers",
                  },
                ]}
              >
                <Input
                  placeholder="Enter product price"
                  value={price}
                  onChange={handlePriceChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="productQuantity"
                label="Product quantity"
                rules={[{ required: true, message: "Input product quantity" }]}
              >
                <Input placeholder="Enter product quantity" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="paymentMethods"
                label="Payment methods"
                rules={[
                  { required: true, message: "Please select a payment method" },
                ]}
              >
                <Select placeholder="Select a payment method">
                  <Select.Option value="Customers come to pick up at the store">
                    Store pickup
                  </Select.Option>
                  <Select.Option value="Free shipping only applies to Hanoi">
                    Ha Noi free shipping
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="orderStatus"
                label="Order status"
                rules={[
                  { required: true, message: "Please select an order status" },
                ]}
              >
                <Select placeholder="Select order status">
                  <Select.Option value="Pending approval">
                    Pending approval
                  </Select.Option>
                  <Select.Option value="Order received">
                    Order received
                  </Select.Option>
                  <Select.Option value="On delivery">On delivery</Select.Option>
                  <Select.Option value="Completed">Completed</Select.Option>
                  <Select.Option value="Canceled">Canceled</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
  function formatCurrency(value: any) {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};
