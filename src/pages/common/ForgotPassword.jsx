import React from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import CommonLayout from "../../layouts/CommonLayout";
import { Card, CardBody, Container, Image } from "react-bootstrap";
import "./ForgotPassword.css";
import { toast } from "react-toastify";
import { forgotPassword } from "../../ReduxToolkit/auth/authSlice";
import { useDispatch } from "react-redux";
import MetaDataPageInfo from "../../utils/metaDataInfo";

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const response = await dispatch(forgotPassword(values)).unwrap();
    form.resetFields();
    if (response.data.status === 200) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <>
      <MetaDataPageInfo
        title="Rent91 - Forgot Password"
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
                      className="pt-4 pb-5 ps-3 pe-3 forgotForm"
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

                      <Row >
                        <Col sm={24}>
                          <Form.Item >
                            <Button
                              type="primary"
                              htmlType="submit"
                              className="w-100 sign_in_btn mt-3 mb-3"
                              size="large"
                            >
                              Send Email to Reset Password
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

export default ForgotPassword;
