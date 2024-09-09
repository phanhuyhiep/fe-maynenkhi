import { Col, Pagination, Row, Spin } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../product.css";
interface listProductProps {
  data: any;
  isLoading: any;
  setPageReportProductHistory: any;
  pageReportProductHistory: any;
  setPageLimitProduct: any;
  pageLimitProduct: any;
  totalPage: number;
  setSelectProduct:any;
  setIsModalDeleteProduct:any;
  setIsActionAdd: any;
  form:any;
  setIsModalAddAndEditProduct:any;
  setOldImages:any;
}

interface ReportProductHistory {
  key: React.Key;
  name: string;
}

export const ListProductTable: React.FC<listProductProps> = ({
  data,
  isLoading,
  setPageReportProductHistory,
  pageReportProductHistory,
  setPageLimitProduct,
  pageLimitProduct,
  totalPage,
  setSelectProduct,
  setIsModalDeleteProduct,
  setIsActionAdd,
  form,
  setIsModalAddAndEditProduct,
  setOldImages,
}) => {
  const convertUrlsToFileList = (urls: string[]) => {
    return urls.map((url, index) => ({
      uid: `old-${index}`,  // UID duy nhất, thêm prefix để dễ phân biệt
      name: `image-${index}`,  // Tên của file
      status: 'done',  // Trạng thái của file
      url: url  // URL của file
    }));
  };
  
  const columnProduct: ColumnsType<ReportProductHistory> = [
    {
      title: "Index",
      align: "center",
      render: (_value, _record, index) => {
        return (pageReportProductHistory - 1) * pageLimitProduct + index + 1;
      },
    },
    {
      title: "Product name",
      align: "center",
      dataIndex: "name",
    },
    {
      title: "Image",
      align: "center",
      dataIndex: "images",
      render: (images: string[]) => {
        if (Array.isArray(images) && images.length > 0) {
          return (
            <img
              src={images[0]}
              alt="Product Image"
              style={{ width: "70px", height: "70px", objectFit: "cover" }}
            />
          );
        }
        return "No Image";
      },
    },
    {
      title: "Price",
      align: "center",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      align: "center",
      dataIndex: "quantity",
    },
    // {
    //   title: "Description",
    //   align: "center",
    //   dataIndex: "description",
    // },
    {
      title: "Category name",
      align: "center",
      dataIndex: "categoryId",
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
              onClick={() => handleDeteteProduct(data)}
            />
          </>
        );
        function handleDeteteProduct(data: any) {
          setSelectProduct(data);
          setIsModalDeleteProduct(true);
        }
        function handleEdit(data: any) {
          setSelectProduct(data);
          setIsActionAdd(false);
          setIsModalAddAndEditProduct(true); 
          setOldImages(convertUrlsToFileList(data?.images));
          form.setFieldsValue({
            id:data?.id,
            name: data?.name,
            price: data?.price,
            quantity: data?.quantity,
            categoryId: data?.categoryId,
            description: data?.description,
            images:convertUrlsToFileList(data?.images)
          })
        }
      },
    },
  ];
  function changePage(page: number, pageSize: any) {
    setPageLimitProduct(pageSize);
    setPageReportProductHistory(page);
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
              columns={columnProduct}
              dataSource={data ?? []}
              pagination={false}
            />
            <Row justify={"end"} style={{ marginTop: "20px" }}>
              <Pagination
                current={pageReportProductHistory}
                total={totalPage * 10}
                showSizeChanger={false}
                onChange={changePage}
              />
            </Row>
          </>
        )}
      </Col>
    </>
  );
};
