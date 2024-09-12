import { Col, Pagination, Row, Spin } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
interface listCategoryProps {
  data: any;
  isLoading: any;
  setPageReportUserHistory: any;
  setPageLimitUser: any;
  pageReportUserHistory: any;
  pageLimitUser: any;
  totalPage: any;
  setUserSelected: any;
  setIsModalAddAndEditUser: any;
  form: any;
  setIsModalDeleteUser:any;
  setIsActionAdd:any;
}

interface ReportUserHistory {
  key: React.Key;
  name: string;
  email: string;
  password: string;
  role: string;
}

export const ListUserTable: React.FC<listCategoryProps> = ({
  data,
  isLoading,
  setPageReportUserHistory,
  setPageLimitUser,
  pageReportUserHistory,
  pageLimitUser,
  totalPage,
  setUserSelected,
  setIsModalAddAndEditUser,
  form,
  setIsModalDeleteUser,
  setIsActionAdd,
}) => {
  const columnCategory: ColumnsType<ReportUserHistory> = [
    {
      title: "Index",
      align: "center",
      render: (_value, _record, index) => {
        // Cách tính index: (trang hiện tại - 1) * số mục mỗi trang + chỉ số của mục hiện tại
        return (pageReportUserHistory - 1) * pageLimitUser + index + 1;
      },
    },
    {
      title: "Name",
      align: "center",
      dataIndex: "name",
    },
    {
      title: "Email",
      align: "center",
      dataIndex: "email",
    },
    // {
    //   title: "Password",
    //   align: "center",
    //   dataIndex: "password",
    // },
    // {
    //   title: "Role",
    //   align: "center",
    //   dataIndex: "role",
    // },
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
          setIsModalDeleteUser(true);
          setUserSelected(data);
        }
        function handleEdit(data: any) {
          setUserSelected(data);
          setIsModalAddAndEditUser(true);
          setIsActionAdd(false);
          form.setFieldsValue({
            id: data?.id,
            name: data?.name,
            email: data?.email,
          });
        }
      },
    },
  ];
  function changePage(page: number, pageSize: any) {
    setPageReportUserHistory(page);
    setPageLimitUser(pageSize);
  }
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
              columns={columnCategory}
              dataSource={data ?? []}
              pagination={false}
            />
            <Row justify={"end"} style={{ marginTop: "20px" }}>
              <Pagination
                current={pageReportUserHistory}
                total={totalPage * 10}
                showSizeChanger={true}
                onChange={changePage}
              />
            </Row>
          </>
        )}
      </Col>
    </>
  );
};
