import { Alert, Spin } from "antd";

export const ListSlice = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Alert
            message="Thông báo"
            description="Trang này đang được cập nhật, vui lòng quay lại sau."
            type="info"
            showIcon
          />
          <Spin size="large" style={{ marginTop: '20px' }} />
        </div>
      );
}