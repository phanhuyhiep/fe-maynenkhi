import { Button, Col, Descriptions, DescriptionsProps, Modal, Pagination, Row, Spin, Typography } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useState } from "react";
import { useGetOrderById } from "../order.loader";
interface listOrderProps {
  data: any;
  isLoading: any;
  setPageReportOrderHistory: any;
  pageReportOderHistory: any;
  setPageLimitOrder: any;
  pageLimitOrder: any;
  totalPage: any;
  setSelectOrder:any;
  setIsModalAddAndEditOrder:any;
  setIsActionAdd:any;
  form:any;
  setIsModalDeleteOrder:any;
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
  timestamp: string;
}

export const ListOrderTable: React.FC<listOrderProps> = ({
  data,
  isLoading,
  setPageReportOrderHistory,
  pageReportOderHistory,
  setPageLimitOrder,
  totalPage,
  setSelectOrder,
  setIsModalAddAndEditOrder,
  setIsActionAdd,
  form,
  setIsModalDeleteOrder,
}) => {
  const [isOrderSelected, setIsOrderSelected] = useState("");
  const {data: dataOrder} = useGetOrderById({ order_id: isOrderSelected});
  const columnOrder: ColumnsType<ReportOrderHistory> = [
    {
      title: "Order code",
      align: "center",
      dataIndex: "orderCode",
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
    {
      title: "Product name",
      align: "center",
      dataIndex: "productName",
    },
    {
      title: "Product price",
      align: "center",
      dataIndex: "productPrice",
      render: (value: number) => {
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(value);
      },
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
      render: (value: number) => {
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(value);
      },
    },
    {
      title: "Timestamp",
      align: "center",
      dataIndex: "timestamp",
      render: (text) => dayjs(text).add(7, 'hour').format("HH:mm:ss - DD/MM/YYYY"),
    },
    {
      title: "Action",
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
              See details
            </Button>
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
          setSelectOrder(data);
          setIsModalDeleteOrder(true);
        }
        function handleEdit(data: any) {
          setIsModalAddAndEditOrder(true);
          setSelectOrder(data);
          setIsActionAdd(false);
          form.setFieldsValue({
            id: data?.id,
            fullName: data?.fullName,
            phoneNumber: data?.phoneNumber,
            city: data?.city,
            district: data?.district,
            commune: data?.commune,
            detailAddress: data?.detailAddress,
            productName: data?.productName,
            productPrice: data?.productPrice,
            productQuantity: data?.productQuantity,
            paymentMethods: data?.paymentMethods,
            orderStatus: data?.orderStatus,
          });
        }
        function handleViewDetails(data: any) {
          setIsModalSeeDetail(true);
          setIsOrderSelected(data?.id)
        }
      },
    },
  ];
  function changePage(page: number, pageSize: any) {
    setPageLimitOrder(pageSize);
    setPageReportOrderHistory(page);
  }
  const { Title } = Typography

  const handleCancelModalSeeDetail = () => {
    setIsModalSeeDetail(false);
  };
  const handleOkModalSeeDetail = () => {
    setIsModalSeeDetail(false);
  };
  const [isModalSeeDetail, setIsModalSeeDetail] = useState(false);
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'UserName',
      children: dataOrder?.fullName,
    },
    {
      key: '2',
      label: 'Telephone',
      children: dataOrder?.phoneNumber,
    },
    {
      key: '3',
      label: 'City',
      children: dataOrder?.city,
    },
    {
      key: '4',
      label: 'District',
      children: dataOrder?.district,
    },
    {
      key: '5',
      label: 'commune',
      children: dataOrder?.commune,
    },
    {
      key: '6',
      label: 'Detail address',
      children: dataOrder?.detailAddress,
    },
  ];

  const columListProduct = [
    {
      title: 'Order code',
      key: '1',
      align: 'center' as 'center',
      render: (_: any, record: any) => <div>{record?.orderCode}</div>
    },
    {
      title: 'Product name',
      key: '2',
      align: 'center' as 'center',
      render: (_: any, record: any) => <div>{record?.productName}</div>
    },
    {
      title: 'Product price',
      key: '3',
      align: 'center' as 'center',
      render: (_: any, record: any) => (
        <strong className='block text-center'>
          {record?.productPrice?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
        </strong>
      )
    },
    {
      title: 'Quantity',
      key: '4',
      align: 'center' as 'center',
      render: (_: any, record: any) => <div>{record?.productQuantity}</div>
    },
    {
      title: 'Total',
      key: '5',
      align: 'center' as 'center',
      render: (_: any, record: any) => (
        <strong className='block text-center'>
          {record?.total?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
        </strong>
      )
    },
    {
      title: 'Created by',
      key: '6',
      align: 'center' as 'center',
      render: (_: any, record: any) => <div>{record?.editBy}</div>
    },
    {
      title: 'Payment methods',
      key: '7',
      align: 'center' as 'center',
      render: (_: any, record: any) => <div>{record?.paymentMethods}</div>
    },
    {
      title: 'Order status',
      key: '8',
      align: 'center' as 'center',
      render: (_: any, record: any) => <div>{record?.orderStatus}</div>
    },
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
              columns={columnOrder}
              dataSource={data ?? []}
              pagination={false}
            />
            <Row justify={"end"} style={{ marginTop: "20px" }}>
              <Pagination
                current={pageReportOderHistory}
                total={totalPage * 10}
                showSizeChanger={true}
                onChange={changePage}
              />
            </Row>
          </>
        )}
      </Col>

      {/* Modal chi tiết sản phẩm */}
      <Modal
        open={isModalSeeDetail}
        onCancel={handleCancelModalSeeDetail}
        onOk={handleOkModalSeeDetail}
        width={1200}
      >
        <Title level={4}>Customer information</Title>
        <Descriptions items={items} />
        <Title level={4}>Product</Title>
        <div>
          <Table
            columns={columListProduct}
            dataSource={[dataOrder]}
            pagination={false}
          />
        </div>
      </Modal>
    </>
  );
};
