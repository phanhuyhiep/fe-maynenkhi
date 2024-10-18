import {
  Alert,
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Spin,
  Upload,
} from "antd";
import { ListProductTable } from "./components/listProductTable";
import {
  useAddProduct,
  useDeleteProduct,
  useEditProduct,
  useGetAllProduct,
} from "./product.loader";
import { useState } from "react";
import { useGetCategory } from "../category/category.loader";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

export const ListProduct = () => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [pageReportProductHistory, setPageReportProductHistory] = useState(1);
  const [pageLimitProduct, setPageLimitProduct] = useState(5);
  const [selectProduct, setSelectProduct] = useState({} as any);
  const [isModalDeleteProduct, setIsModalDeleteProduct] = useState(false);
  const [isActionAdd, setIsActionAdd] = useState(true);
  const [description, setDescription] = useState("");
  const [oldImages, setOldImages] = useState({} as any);
  const [selectCategory, setSelectCategory] = useState("");
  const [inputProductNameSearch, setInputProductNameSearch] = useState("");
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };
  const [isModalAddAndEditProduct, setIsModalAddAndEditProduct] =
    useState(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const { data: dataProduct, isLoading: isLoadingDataProduct } =
    useGetAllProduct({
      page: pageReportProductHistory,
      limit: 5,
      categoryName: selectCategory,
      searchTerm: inputProductNameSearch,
    });
  const { mutate: mutateAddProduct, isLoading: isLoadingAddProduct } =
    useAddProduct();
  const { data: dataCategory } = useGetCategory({
    page: 1,
    limit: 1000,
  });
  const { mutate: mutateDeleteProduct, isLoading: isLoadingDeleteProduct } =
    useDeleteProduct();
  const { mutate: mutateEditProduct, isLoading: isLoadingEditProduct } =
    useEditProduct();
  const handleCancelModalAddAndEditProduct = () => {
    setIsModalAddAndEditProduct(false);
    form.resetFields();
    setOldImages("");
    setFileList([]);
  };
  const handleDeleteProduct = () => {
    mutateDeleteProduct(selectProduct?.id);
    setIsModalDeleteProduct(false);
  };
  const handleCancelDeleteProduct = () => {
    setIsModalDeleteProduct(false);
  };
  const showModalAddCategory = () => {
    setIsActionAdd(true);
    setIsModalAddAndEditProduct(true);
  };
  const handleOkAddProduct = () => {
    form
      .validateFields()
      .then((values) => {
        const formData = new FormData();
        formData.append("name", values?.name || "");
        formData.append("price", values?.price || "");
        formData.append("quantity", values?.quantity || "");
        formData.append("description", values?.description || "");
        formData.append("categoryName", values?.categoryName || "");
        fileList.forEach((file) => {
          formData.append("images", (file as Blob) || "");
        });
        mutateAddProduct(formData);
        setIsModalAddAndEditProduct(false);
        form.resetFields();
        setFileList([]);
      })
      .catch((errorInfo) => {
        console.log("Validate Failed:", errorInfo);
      });
  };
  const uploadImage = (options: any) => {
    const { file, onSuccess } = options;
    onSuccess("Images upload successfully");
    const newFileList = [...fileList, file];
    setFileList(newFileList);
  };
  const onRemove = (file: any) => {
    setFileList((prevFileList: any) =>
      prevFileList?.filter((item: any) => item.uid !== file.uid)
    );
    setOldImages((prevOldImages: any) => {
      const currentOldImages = Array.isArray(prevOldImages) ? prevOldImages: [];
      const updatedImages = currentOldImages.filter((image: any) => {
        return image.uid !== file.uid;
      });
      return updatedImages;
    });
  };
  // Hàm tải hình ảnh từ URL và trả về đối tượng Blob
  const fetchImageAsBlob = async (url: string): Promise<Blob> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return blob;
  };
  // Hàm để chuyển đổi Blob thành File
  const blobToFile = (blob: Blob, name: string): File => {
    return new File([blob], name, { type: blob.type });
  };
  // Hàm để chuyển đổi thông tin ảnh thành File
  const convertToFile = async (imageInfo: {
    name: string;
    url: string;
    status: string;
    uid: number;
  }): Promise<File> => {
    const { name, url } = imageInfo;
    const blob = await fetchImageAsBlob(url);
    return blobToFile(blob, name);
  };
  const handleOkEditProduct = () => {
    form
      .validateFields()
      .then(async (values) => {
        const formData = new FormData();
        formData.append("id", selectProduct?.id || "");
        formData.append("name", values?.name || "");
        formData.append("price", values?.price || "");
        formData.append("quantity", values?.quantity || "");
        formData.append("description", values?.description || "");
        formData.append("categoryName", values?.categoryName || "");
        const oldFilesPromises = oldImages.map(async (imageInfo: any) => {
          const file = await convertToFile(imageInfo);
          return file;
        });
        const oldFiles = await Promise.all(oldFilesPromises);
        oldFiles.forEach((file) => {
          formData.append("images", file);
        });

        fileList.forEach((file) => {
          formData.append("images", (file as Blob) || "");
        });
        mutateEditProduct(formData);
        setIsModalAddAndEditProduct(false);
        form.resetFields();
        setFileList([]);
      })
      .catch((errorInfo) => {
        console.log("Validate Failed:", errorInfo);
      });
  };
  const handleSelectChange = (value: any) => {
    if (value === "all") {
      setSelectCategory("");
    } else {
      setSelectCategory(value);
    }
  };
  const handleSearch = (value: any) => {
    if (value === "") {
      setInputProductNameSearch("");
    } else {
      setInputProductNameSearch(value);
    }
  };

  return (
    <>
      <Row>
        <Col span={24} xxl={24} xl={24}>
          <Row justify={"space-between"}>
            <Col>
              <span className="titleMainDashboard">PRODUCTS</span>{" "}
            </Col>
            <Col>
              <Row gutter={[10, 0]}>
                <Col>
                  <Input.Search
                    placeholder="Search product name or product code"
                    enterButton
                    onSearch={handleSearch}
                    style={{ width: 350 }}
                  />
                </Col>
                <Col>
                  <Select
                    style={{ width: 200 }}
                    placeholder="Select a category"
                    onChange={handleSelectChange}
                  >
                    <Option value="all">ALL CATEGORIES</Option>{" "}
                    {dataCategory?.categories?.map((category: any) => (
                      <Option key={category.id} value={category.name}>
                        {category.name}
                      </Option>
                    ))}
                  </Select>
                </Col>
                <Col>
                  <Button type="primary" onClick={showModalAddCategory}>
                    ADD PRODUCT
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row
            justify={"space-between"}
            style={{
              marginTop: "30px",
            }}
            gutter={[0, 30]}
          >
            <Col
              xl={24}
              xs={24}
              style={{ backgroundColor: "#fff", padding: "30px" }}
            >
              <Row justify={"space-between"} gutter={[0, 40]}>
                <>
                  <ListProductTable
                    data={dataProduct?.products ?? []}
                    isLoading={isLoadingDataProduct}
                    setPageReportProductHistory={setPageReportProductHistory}
                    pageReportProductHistory={pageReportProductHistory}
                    setPageLimitProduct={setPageLimitProduct}
                    setSelectProduct={setSelectProduct}
                    pageLimitProduct={pageLimitProduct}
                    setIsModalDeleteProduct={setIsModalDeleteProduct}
                    totalPage={dataProduct?.total_pages}
                    setIsModalAddAndEditProduct={setIsModalAddAndEditProduct}
                    setIsActionAdd={setIsActionAdd}
                    setOldImages={setOldImages}
                    form={form}
                  />
                </>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* Modal loading */}
      <Modal
        open={
          isLoadingAddProduct || isLoadingDeleteProduct || isLoadingEditProduct
        }
        footer={false}
        closable={false}
        centered={true}
      >
        <Col span={24}>
          <Row justify={"center"}>
            <h1></h1>
          </Row>
          <Row justify={"center"}>
            <Spin />
          </Row>
        </Col>
      </Modal>
      {/* Modal delete product */}
      <Modal
        title="DeleteCustomer"
        open={isModalDeleteProduct}
        onOk={handleDeleteProduct}
        onCancel={handleCancelDeleteProduct}
      >
        <Alert
          message={
            <p>
              Are you sure you want to delete the category "
              <b>{selectProduct?.name}"</b> ?
            </p>
          }
          type="error"
          showIcon
        />
      </Modal>
      {/* Modal add & edit product */}
      <Modal
        visible={isModalAddAndEditProduct}
        title={isActionAdd ? "Add product" : "Edit product"}
        onCancel={handleCancelModalAddAndEditProduct}
        onOk={isActionAdd ? handleOkAddProduct : handleOkEditProduct}
        width={1000}
      >
        <Form
          form={form}
          name="addProduct"
          layout="vertical"
          autoComplete="off"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Input Name",
                  },
                ]}
              >
                <Input placeholder="Enter name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: "Input price" }]}
              >
                <Input placeholder="Enter price" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="quantity"
                label="Quantity"
                rules={[{ required: true, message: "Input quantity" }]}
              >
                <Input placeholder="Enter quantity" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="categoryName"
                label="Category"
                rules={[{ required: true, message: "Select category" }]}
              >
                <Select
                  placeholder="Select category"
                  options={dataCategory?.categories
                    ?.filter((item: any) => item.id !== "")
                    ?.map((item: any) => {
                      return {
                        label: item.name,
                        value: item.name,
                      };
                    })}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item
                label="Image"
                name="images"
                getValueFromEvent={(event: any) => event?.fileList}
                rules={[
                  { required: true, message: "Please input your images!" },
                ]}
                valuePropName={"fileList"}
              >
                <Upload
                  customRequest={uploadImage}
                  listType="picture-card"
                  onRemove={onRemove}
                >
                  {fileList.length < 10 && "+ Upload"}
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ height: "350px" }}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "Input description",
                  },
                ]}
              >
                <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={setDescription}
                  placeholder="Enter description"
                  style={{ height: "250px" }}
                  modules={modules}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
