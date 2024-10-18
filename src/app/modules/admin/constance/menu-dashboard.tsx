import {
  UserOutlined,
  FileOutlined,
  ShoppingCartOutlined,
  OrderedListOutlined,
  CommentOutlined,
  LineChartOutlined,
  MoneyCollectOutlined,
  FileAddOutlined,
  CustomerServiceOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { SiAdminer } from 'react-icons/si';

export const MenuDashboard = () => {
  const { t: tMenu } = useTranslation("translation", { keyPrefix: "menu" });

  return [
    {
      key: '/',
      icon: <SiAdminer />,
      label: tMenu("Dashboard")
    },
    {
      key: '/category',
      icon: <FileOutlined />,
      label: tMenu("Category")
    },
    {
      key: '/product',
      icon: <OrderedListOutlined />,
      label: tMenu("Product")
    },
    {
      key: '/order',
      icon: <ShoppingCartOutlined />,
      label: tMenu("Order")
    },
    {
      key: '/user',
      icon: <UserOutlined />,
      label: tMenu("User")
    },
    {
      key: '/comment',
      icon: <CommentOutlined />,
      label: tMenu("Comment")
    },
    {
      key: '/contact',
      icon: <CustomerServiceOutlined />,
      label: tMenu("Contact")
    },
    {
      key: '/voucher',
      icon: <MoneyCollectOutlined />,
      label: tMenu("Voucher")
    },
    {
      key: '/slice',
      icon: <FileAddOutlined />,
      label: tMenu("Slice")
    },
    {
      key: '/statistic',
      icon: <LineChartOutlined />,
      label: tMenu("Statistical")
    }
  ];
};