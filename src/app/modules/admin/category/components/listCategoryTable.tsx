import { Col, Pagination, Row, Spin } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../category.css";
import { useTranslation } from "react-i18next";
interface listCategoryProps {
  data: any;
  isLoading: any;
  totalPage: number;
  pageReportCategoryHistory: number;
  setPageReportCategoryHistory: any;
  setPageLimitCategory: any;
  setCategorySelected: any;
  setIsModalDeleteCategory: any;
  pageLimitCategory: number;
  setIsModalAddAndEditCategory: any;
  setIsActionAdd: any;
  form: any;
}

interface ReportCategoryHistory {
  key: React.Key;
  name: string;
}

export const ListCategoryTable: React.FC<listCategoryProps> = ({
  data,
  isLoading,
  totalPage,
  pageReportCategoryHistory,
  setPageReportCategoryHistory,
  setPageLimitCategory,
  setCategorySelected,
  setIsModalDeleteCategory,
  pageLimitCategory,
  setIsModalAddAndEditCategory,
  setIsActionAdd,
  form,
}) => {
  const { t: tCategory } = useTranslation("translation", { keyPrefix: "category" });
  const columnCategory: ColumnsType<ReportCategoryHistory> = [
    {
      title: tCategory("Index"),
      align: "center",
      render: (_value, _record, index) => {
        // Cách tính index: (trang hiện tại - 1) * số mục mỗi trang + chỉ số của mục hiện tại
        return (pageReportCategoryHistory - 1) * pageLimitCategory + index + 1;
      },
    },
    {
      title: tCategory("Category name"),
      align: "center",
      dataIndex: "name",
    },
    {
      title: tCategory("Action"),
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
              onClick={() => handleDeteteSegment(data)}
            />
          </>
        );
        function handleDeteteSegment(data: any) {
          setCategorySelected(data);
          setIsModalDeleteCategory(true);
        }
        function handleEdit(data: any) {
          setCategorySelected(data);
          setIsActionAdd(false);
          setIsModalAddAndEditCategory(true);
          form.setFieldsValue({
            id: data?.id,
            name: data?.name,
          });
        }
      },
    },
  ];
  function changePage(page: number, pageSize: any) {
    setPageReportCategoryHistory(page);
    setPageLimitCategory(pageSize);
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
                current={pageReportCategoryHistory}
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
