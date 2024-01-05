import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Image,
  Container,
  CardBody,
  Button,
} from "react-bootstrap";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Select, Upload } from "antd";
import "./AddRentItem.css";
import UserLayout from "../../../layouts/UserLayout";

export default function AddRentItem() {
  const { TextArea } = Input;

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [form] = Form.useForm();

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const onFinish = (values) => {
    // Handle the submission of form data, e.g., send it to a server
    console.log("Received values:", values);
  };

  return (
    <>
      <UserLayout>
        <main className="fluid-container mainContent">
          <div className="rentProducts">
            <Container className="my-5 gradient-form">
              <Row>
                <Col md={2} sm={2}></Col>
                <Col md={8} sm={8}>
                  <Card className="Rent_form_card">
                    <CardBody className="text-center">
                      <div className="pt-3 pb-2">
                        <Image
                          src="/assets/images/rent91_logo.png"
                          className="SignUprentLogo m-auto"
                          alt="logo"
                        />
                      </div>
                      <Form
                        form={form}
                        className="rentForm pt-4 pb-0 px-3"
                        onFinish={onFinish}
                      >
                        <Form.Item
                          name="item_name"
                          rules={[
                            {
                              required: true,
                              message: "Please Enter Item Name",
                              min: 5,
                            },
                          ]}
                        >
                          <Input placeholder="Item Name" />
                        </Form.Item>
                        <Form.Item
                          name="item_description"
                          rules={[
                            {
                              required: true,
                              message: "Please Enter Item Description",
                            },
                          ]}
                        >
                          <TextArea rows={4} placeholder="Item Description" />
                        </Form.Item>
                        <Form.Item
                          name="productCategory"
                          rules={[
                            {
                              required: true,
                              message: "Please select Product Category",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Product Category"
                            className="text-left"
                            onChange={handleCategoryChange}
                            value={selectedCategory}
                          >
                            <Select.Option value="demo">
                              Product Category
                            </Select.Option>
                            <Select.Option value="other">
                              Other Category
                            </Select.Option>
                          </Select>
                        </Form.Item>
                        {selectedCategory === "other" && (
                          <Form.Item name="otherCategory">
                            <Input placeholder="Specify Other Category" />
                          </Form.Item>
                        )}
                        <Form.Item
                          name="categoryDescription"
                          rules={[
                            {
                              required: true,
                              message: "Please enter Category Description",
                            },
                          ]}
                        >
                          <TextArea
                            rows={4}
                            placeholder="Category Description"
                          />
                        </Form.Item>
                        <Row>
                          <Col className="ps-0">
                            <Form.Item
                              name="deposit_price"
                              rules={[
                                {
                                  required: true,
                                  message: "Please Enter Deposit Price",
                                },
                              ]}
                            >
                              <Input
                                placeholder="Deposit Price"
                                type="number"
                              />
                            </Form.Item>
                          </Col>
                          <Col className="pe-0">
                            <Form.Item
                              name="rental_price"
                              rules={[
                                {
                                  required: true,
                                  message: "Please Enter Rental Price",
                                },
                              ]}
                            >
                              <Input placeholder="Rental Price" type="number" />
                            </Form.Item>
                          </Col>
                        </Row>
                        <div className="categoryImages">
                          <Form.Item
                            name="images"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                          >
                            <Upload action="/upload.do" listType="picture-card">
                              <button
                                style={{
                                  border: 0,
                                  background: "none",
                                }}
                                type="button"
                              >
                                <PlusOutlined />
                                <div
                                  style={{
                                    marginTop: 8,
                                  }}
                                >
                                  Upload
                                </div>
                              </button>
                            </Upload>
                          </Form.Item>
                        </div>
                        <Form.Item>
                          <Button type="primary" htmlType="submit">
                            Add Rent Item
                          </Button>
                        </Form.Item>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
                <Col md={2} sm={2}></Col>
              </Row>
            </Container>
          </div>
        </main>
      </UserLayout>
    </>
  );
}
