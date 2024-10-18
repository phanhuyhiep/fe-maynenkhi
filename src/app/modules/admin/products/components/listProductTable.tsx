import { Button, Col, Image, Modal, Pagination, Row, Spin, Typography } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import "../product.css";
import { useState } from "react";
import { useGetProductById } from "../product.loader";
import ReactQuill from "react-quill";
import { useTranslation } from "react-i18next";
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
  const { t: tProduct } = useTranslation("translation", { keyPrefix: "product" });
  const columnProduct: ColumnsType<ReportProductHistory> = [
    {
      title: tProduct("Product code"),
      align: "center",
      dataIndex: "productCode",
    },
    {
      title: tProduct("Product name"),
      align: "center",
      dataIndex: "name",
    },
    {
      title: tProduct("Image"),
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
        return tProduct("No Image");
      },
    },
    {
      title: tProduct("Price"),
      align: "center",
      dataIndex: "price",
      render: (value: number) => {
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(value);
      },
    },
    {
      title: tProduct("Quantity"),
      align: "center",
      dataIndex: "quantity",
    },
    {
      title: tProduct("Category name"),
      align: "center",
      dataIndex: "categoryName",
    },
    {
      title: tProduct("Action"),
      align: "center",
      dataIndex: "action",
      render: (_, data: any) => {
        return (
          <>
            <Button
              type="link"
              icon={<EyeOutlined />}
              onClick={() => handleViewDetails(data)}
            >
              {tProduct("See details")}
            </Button>
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
        function handleViewDetails(data:any){
          setIsProductSelected(data?.id);
          setIsModalSeeDetail(true);
        }
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
  const [isProductSelected, setIsProductSelected] = useState("");
  const {data: dataProduct} = useGetProductById({id: isProductSelected})
  const [isModalSeeDetail, setIsModalSeeDetail] = useState(false);
  console.log(dataProduct);
  const handleCancelModalSeeDetail = () => {
    setIsModalSeeDetail(false);
  };
  const handleOkModalSeeDetail = () => {
    setIsModalSeeDetail(false);
  };
  const { Title } = Typography
  const columListProduct = [
    {
      title: tProduct('Product code'),
      key: '1',
      align: 'center' as 'center',
      render: (_: any, record: any) => <div>{record?.productCode}</div>
    },
    {
      title: tProduct('Product name'),
      key: '2',
      align: 'center' as 'center',
      render: (_: any, record: any) => <div>{record?.name}</div>
    },
    {
      title: tProduct('Product image'),
      key: '3',
      align: 'center' as 'center',
      render: (_: any, record: any) => (
        <Image.PreviewGroup
        items={record?.images}
      >
        <Image
          width={200}
          src={record?.images[0]} // Hiển thị ảnh số 0
        />
      </Image.PreviewGroup>
      ),
    },
    {
      title: tProduct('Product price'),
      key: '4',
      align: 'center' as 'center',
      render: (_: any, record: any) => (
        <strong className='block text-center'>
          {record?.price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
        </strong>
      )
    },
    {
      title: tProduct('Quantity'),
      key: '5',
      align: 'center' as 'center',
      render: (_: any, record: any) => <div>{record?.quantity}</div>
    },
    {
      title: tProduct('Description'),
      key: '6',
      align: 'center' as 'center',
      render: (_: any, record: any) => (
        <div
          style={{
            maxHeight: '500px',
            overflowY: 'auto',
            padding: '10px',
            border: '1px solid #ddd',
          }}
        >
          <ReactQuill
            value={record?.description || ''}
            readOnly={true} 
            theme="bubble"
          />
        </div>
      ),
    },
    {
      title: tProduct('Category name'),
      key: '7',
      align: 'center' as 'center',
      render: (_: any, record: any) => <div>{record?.categoryName}</div>
    }
  ];
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
      <Modal
        open={isModalSeeDetail}
        onCancel={handleCancelModalSeeDetail}
        onOk={handleOkModalSeeDetail}
        width={1400}
      >
        <Title level={4}>{tProduct("Product detail")}</Title>
        <div>
          <Table
            columns={columListProduct}
            dataSource={[dataProduct]}
            pagination={false}
          />
        </div>
      </Modal>
    </>
  );
};
