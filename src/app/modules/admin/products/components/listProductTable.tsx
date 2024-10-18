import { Col, Image, Pagination, Row, Spin } from "antd";
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
  setSelectProduct: any;
  setIsModalDeleteProduct: any;
  setIsActionAdd: any;
  form: any;
  setIsModalAddAndEditProduct: any;
  setOldImages: any;
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
      uid: `old-${index}`, 
      name: `image-${index}`,
      status: "done",
      url: url,
    }));
  };
console.log(data);

  const columnProduct: ColumnsType<ReportProductHistory> = [
    {
      title: "Product code",
      align: "center",
      dataIndex: "productCode",
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
            <Image
              width={120}
              style={{ height: "100px", objectFit: "cover" }}
              src={images[0]}
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
      render: (value: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
      },
    },
    {
      title: "Quantity",
      align: "center",
      dataIndex: "quantity",
    },
    {
      title: "Category name",
      align: "center",
      dataIndex: "categoryName",
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
            id: data?.id,
            name: data?.name,
            price: data?.price,
            quantity: data?.quantity,
            categoryName: data?.categoryName,
            description: data?.description,
            images: convertUrlsToFileList(data?.images),
          });
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
