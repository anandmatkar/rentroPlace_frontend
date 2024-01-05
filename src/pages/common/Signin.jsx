import React from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import CommonLayout from "../../layouts/CommonLayout";
import { Card, CardBody, Container, Image } from "react-bootstrap";
import "./Signin.css";
import { toast } from "react-toastify";
import { loginUser } from "../../ReduxToolkit/auth/authSlice";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import MetaDataPageInfo from "../../utils/metaDataInfo";

const Signin = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const response = await dispatch(loginUser(values)).unwrap();

    if (response.data.status === 200) {
      toast.success(response.data.message);
      navigate("/shop");
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <>
      <MetaDataPageInfo
        title="Rent91 - Sign In"
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
                        name="email"
                        rules={[
                          {
                            required: true,
                            type: "email",
                            message: "Please type valid email address !!!",
                          },
                        ]}
                      >
                        <Input
                          addonBefore={<UserOutlined />}
                          placeholder="Email"
                          size="large"
                        />
                      </Form.Item>

                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            // message: "Please input your password !!!",
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
                                  "Password must be at least 8 characters long and contain at least one letter and one number."
                                );
                              }

                              return Promise.resolve();
                            },
                          },
                        ]}
                      >
                        <Input.Password
                          addonBefore={<LockOutlined />}
                          placeholder="Password"
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
                              Login
                            </Button>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={24} sm={24} xs={24}>
                          <div className="NoAccount">
                            Don't have an account?{" "}
                            <Card.Link as={NavLink} to={"/signup"}>
                              Sign up
                            </Card.Link>
                          </div>
                        </Col>
                        <Col md={24} sm={24} xs={24}>
                          <div className="ForgetPassword">
                            <Card.Link as={NavLink} to={"/forgot-password"}>
                              Forgot Password?
                            </Card.Link>
                          </div>
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

export default Signin;
