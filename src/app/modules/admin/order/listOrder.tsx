import { Button, Col, Input, Row } from "antd";
import { ListOrderTable } from "./components/listOrderTable";
import { useGetAllOrder } from "./order.loader";

export const ListOrder = () => {
  // const [form] = Form.useForm();
  const { data: dataOrder, isLoading: isLoadingDataOrder } = useGetAllOrder({
    page: 1,
    limit: 10,
    order_status: "",
    phone_number: "",
  })
  console.log(dataOrder);

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
                    style={{ width: 300 }}
                  />
                </Col>
                <Col>
                  <Button type="primary">
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
              <Row justify={"space-between"} gutter={[0, 40]}>
                  <ListOrderTable
                    data={dataOrder?.orders ?? []}
                    isLoading={isLoadingDataOrder}
                  />
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
