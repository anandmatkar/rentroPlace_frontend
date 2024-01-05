import React from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { LockOutlined } from "@ant-design/icons";
import CommonLayout from "../../../layouts/CommonLayout";
import { Card, CardBody, Container, Image } from "react-bootstrap";
import "./ChangePassword.css";
import { toast } from "react-toastify";
import { changeUserPassword } from "../../../ReduxToolkit/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MetaDataPageInfo from "../../../utils/metaDataInfo";
import removeAuthenticationToken from "../../../utils/removeAuthenticationToken";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { oldPassword, currentPassword } = values;

    const changePassCredentials = {
      oldPassword,
      currentPassword,
    };

    const response = await dispatch(
      changeUserPassword(changePassCredentials)
    ).unwrap();

    if (response.data.status === 200) {
      toast.success(response.data.message);
      navigate(-1);
    } else if (response.data.status === 401) {
      toast.error(response.data.message);
      removeAuthenticationToken();
      navigate("/signin");
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <>
      <MetaDataPageInfo
        title="Rent91 - User Change Password"
        description="Your page description"
        keywords="React, JavaScript, Web Development"
        favicon="/path/to/favicon.png"
      />

      <CommonLayout>
        <main className="fluid-container">
          <Container className="gradient-form">
            <Row>
              <Col lg={6} md={6} sm={4}></Col>
              <Col lg={12} md={12} sm={16}>
                <Card className="login_form_card my-5">
                  <CardBody className="text-center">
                    <div className="pt-4">
                      <Image
                        src="/assets/images/rent91_logo.png"
                        className="LoginrentLogo m-auto"
                      />
                    </div>
                    <Form
                      form={form}
                      name="login"
                      initialValues={{
                        remember: true,
                      }}
                      onFinish={onFinish}
                      className="pt-4 pb-5 pl-3 pr-3 loginForm"
                    >
                      <Form.Item
                        name="oldPassword"
                        rules={[
                          {
                            required: true,
                            message: "Please input your old password !!!",
                            min: 8,
                          },
                        ]}
                      >
                        <Input.Password
                          addonBefore={<LockOutlined />}
                          placeholder="Enter Old Password"
                          size="large"
                        />
                      </Form.Item>
                      <Form.Item
                        name="currentPassword"
                        rules={[
                          {
                            required: true,
                            min: 8,
                            validator: (_, value) => {
                              if (!value) {
                                return Promise.reject(
                                  "Please input your password!"
                                );
                              }

                              if (
                                !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(
                                  value
                                )
                              ) {
                                return Promise.reject(
                                  "New Password must be at least 8 characters long and contain at least one letter and one number."
                                );
                              }

                              return Promise.resolve();
                            },
                          },
                        ]}
                      >
                        <Input.Password
                          addonBefore={<LockOutlined />}
                          placeholder="Enter New Password"
                          size="large"
                        />
                      </Form.Item>

                      <Form.Item
                        name="confirmCurrentPassword"
                        dependencies={["currentPassword"]}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Please confirm your new password !!!",
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              const newPassword =
                                getFieldValue("currentPassword");
                              if (newPassword && value !== newPassword) {
                                return Promise.reject(
                                  "New Password & Confirm Password do not match"
                                );
                              } else {
                                return Promise.resolve();
                              }
                            },
                          }),
                        ]}
                      >
                        <Input.Password
                          addonBefore={<LockOutlined />}
                          placeholder="Confirm New Password"
                          size="large"
                        />
                      </Form.Item>

                      <Row gutter={16}>
                        <Col md={24}>
                          <Form.Item>
                            <Button
                              type="primary"
                              htmlType="submit"
                              className="w-100 sign_in_btn mt-3 mb-3"
                              size="large"
                            >
                              Change Password
                            </Button>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
              <Col lg={6} md={6} sm={4}></Col>
            </Row>
          </Container>
        </main>
      </CommonLayout>
    </>
  );
};

export default ChangePassword;
