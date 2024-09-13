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
  } from '@ant-design/icons'
  import { SiAdminer } from 'react-icons/si'
  export const MenuDashboard = [
    {
      key: '/',
      icon: <SiAdminer />,
      label: 'Dashboard'
    },
    {
      key: '/category',
      icon: <FileOutlined />,
      label: 'Category'
    },
    {
      key: '/product',
      icon: <OrderedListOutlined />,
      label: 'Product'
    },
  
    {
      key: '/order',
      icon: <ShoppingCartOutlined />,
      label: 'Order'
    },
    {
      key: '/user',
      icon: <UserOutlined />,
      label: 'user'
    },
    {
      key: '/comment',
      icon: <CommentOutlined />,
      label: 'Comment'
    },
    {
      key: '/contact',
      icon: <CustomerServiceOutlined />,
      label: 'Contact'
    },
  
    {
      key: '/voucher',
      icon: <MoneyCollectOutlined />,
      label: 'Voucher'
    },
    {
      key: '/admin/slice',
      icon: <FileAddOutlined />,
      label: 'Slice'
    },
    {
      key: '/statistic',
      icon: <LineChartOutlined />,
      label: 'Statistical'
    }
  ]
  