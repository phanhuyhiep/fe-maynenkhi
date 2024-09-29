import { Col, Row, Spin } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
interface listOrderProps {
  data: any;
  isLoading: any;
}

interface ReportOrderHistory {
  key: React.Key;
  fullName: string;
  phoneNumber: string;
  city: string;
  district: string;
  commune: string;
  detailAddress: string;
  total: string;
  productName: string;
  productPrice: string;
  productQuantity: string;
  payment_methods: string;
  editBy: string;
  orderStatus: string;
  timestamp: string
}

export const ListOrderTable: React.FC<listOrderProps> = ({
  data,
  isLoading,
}) => {
  const columnOrder: ColumnsType<ReportOrderHistory> = [
    {
      title: "Index",
      align: "center",
      // render: (_value, _record, index) => {
      //   // Cách tính index: (trang hiện tại - 1) * số mục mỗi trang + chỉ số của mục hiện tại
      //   return (pageReportUserHistory - 1) * pageLimitUser + index + 1;
      // },
    },
    {
      title: "Full name",
      align: "center",
      dataIndex: "fullName",
    },
    {
      title: "Phone number",
      align: "center",
      dataIndex: "phoneNumber",
    },
    // {
    //   title: "City",
    //   align: "center",
    //   dataIndex: "city",
    // },
    // {
    //   title: "District",
    //   align: "center",
    //   dataIndex: "district",
    // },
    // {
    //   title: "Commune",
    //   align: "center",
    //   dataIndex: "commune",
    // },
    // {
    //   title: "Detail address",
    //   align: "center",
    //   dataIndex: "detailAddress",
    // },
    {
      title: "Product name",
      align: "center",
      dataIndex: "productName",
    },
    {
      title: "Product price",
      align: "center",
      dataIndex: "productPrice",
    },
    {
      title: "Product quantity",
      align: "center",
      dataIndex: "productQuantity",
    },
    {
      title: "Total",
      align: "center",
      dataIndex: "total",
    },
    // {
    //   title: "Payment methods",
    //   align: "center",
    //   dataIndex: "payment_methods",
    // },
    // {
    //   title: "Edit by",
    //   align: "center",
    //   dataIndex: "editBy",
    // },
    // {
    //   title: "Order status",
    //   align: "center",
    //   dataIndex: "orderStatus",
    // },
    {
      title: "Timestamp",
      align: "center",
      dataIndex: "timestamp",
    },
    {
      title: "Action",
      align: "center",
      dataIndex: "action",
      render: (_, data: any) => {
        return (
          <>
            <EditOutlined
              className="edit-button"
              onClick={() => handleEdit(data)}
            />
            <DeleteOutlined
              className="delete-button"
              onClick={() => handleDetete(data)}
            />
          </>
        );
        function handleDetete(data: any) {
          console.log(data);

        }
        function handleEdit(data: any) {
          console.log(data);

        }
      },
    },
  ];
  // function changePage(page: number, pageSize: any) {
  // }
  return (
    <>
      <Col span={24}>
        {isLoading ? (
          <Row justify={"center"}>
            <Spin size="large" />
          </Row>
        ) : (
          <>
            <Table
              columns={columnOrder}
              dataSource={data ?? []}
              pagination={false}
            />
            {/* <Row justify={"end"} style={{ marginTop: "20px" }}>
              <Pagination
                current={pageReportUserHistory}
                total={totalPage * 10}
                showSizeChanger={true}
                onChange={changePage}
              />
            </Row> */}
          </>
        )}
      </Col>
    </>
  );
};
