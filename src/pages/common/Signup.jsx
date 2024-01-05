import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Upload } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  SafetyCertificateOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import CommonLayout from "../../layouts/CommonLayout";
import ImgCrop from "antd-img-crop";
import { toast } from "react-toastify";
import MetaDataPageInfo from "../../utils/metaDataInfo";
import { Card, CardBody, Container, Image } from "react-bootstrap";
import "./Signup.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  registerUser,
  uploadUserProfilePhoto,
} from "../../ReduxToolkit/auth/authSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [avatarPath, setAvatarPath] = useState("");

  const uploadProfilePicture = async (file) => {
    const response = await dispatch(uploadUserProfilePhoto(file)).unwrap();
    if (response.data.status === 201) {
      setAvatarPath(response.data.data);
      toast.success(response.data.message);
      return response.data;
    } else {
      return toast.error(response.data.message);
    }
  };

  const onFinish = async (values) => {
    const createUser = { ...values, avatar: avatarPath };
    const response = await dispatch(registerUser(createUser)).unwrap();
    if (response.data.status === 201) {
      toast.success(response.data.message);
      setAvatarPath("");
      navigate("/signin");
    } else {
      toast.error(response.data.message);
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <>
      <MetaDataPageInfo
        title="Rent91 - Register with Us"
        description="Your page description"
        keywords="React, JavaScript, Web Development"
        favicon="/path/to/favicon.png"
      />

      <CommonLayout>
        <main className="fluid-container">
          <Container className="gradient-form">
            <Row>
              <Col lg={4} md={3} sm={1}></Col>
              <Col lg={16} md={18} sm={22}>
                <Card className="SignUp_form_card my-5">
                  <CardBody className="text-center">
                    <div className="pt-3 pb-2">
                      <Image
                        src="/assets/images/rent91_logo.png"
                        className="SignUprentLogo m-auto"
                      />
                    </div>
                    <Form
                      form={form}
                      name="signup"
                      initialValues={{
                        remember: true,
                      }}
                      onFinish={onFinish}
                      className="signupForm"
                    >
                      <Row gutter={16}>
                        <Col span={24} md={12}>
                          <Form.Item
                            name="first_name"
                            hasFeedback
                            validateDebounce={500}
                            rules={[
                              {
                                required: true,
                                message: "Please input your first name!",
                                min: 3,
                              },
                            ]}
                          >
                            <Input
                              addonBefore={<UserOutlined />}
                              // prefix={<UserOutlined />}
                              placeholder="First Name"
                              size="large"
                            />
                          </Form.Item>
                        </Col>
                        <Col span={24} md={12}>
                          <Form.Item
                            name="last_name"
                            hasFeedback
                            validateDebounce={500}
                            rules={[
                              {
                                required: true,
                                message: "Please input your last name!",
                                min: 3,
                              },
                            ]}
                          >
                            <Input
                              addonBefore={<UserOutlined />}
                              placeholder="Last Name"
                              size="large"
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item
                        name="email"
                        hasFeedback
                        validateDebounce={500}
                        rules={[
                          {
                            required: true,
                            type: "email",
                            message: "Invalid email address",
                          },
                        ]}
                      >
                        <Input
                          addonBefore={<MailOutlined />}
                          placeholder="Email"
                          size="large"
                        />
                      </Form.Item>

                      <Row gutter={16}>
                        <Col span={24} md={12}>
                          <Form.Item
                            name="password"
                            hasFeedback
                            validateDebounce={500}
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
                        </Col>
                        <Col span={24} md={12}>
                          <Form.Item
                            name="confirmPassword"
                            hasFeedback
                            dependencies={["password"]}
                            rules={[
                              {
                                required: true,
                                message: "Please confirm your password!",
                              },
                              ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (
                                    !value ||
                                    getFieldValue("password") === value
                                  ) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(
                                    "Password and Confirm Password Not match"
                                  );
                                },
                              }),
                            ]}
                          >
                            <Input.Password
                              addonBefore={<LockOutlined />}
                              placeholder="Confirm Password"
                              size="large"
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item
                        name="phone"
                        hasFeedback
                        validateDebounce={500}
                        rules={[
                          {
                            required: true,
                            // message: "Please input your phone number!",
                            validator: (_, value) => {
                              if (!value) {
                                return Promise.reject(
                                  "Please input your phone number!"
                                );
                              }

                              // Check if the phone number consists of exactly 10 digits and only contains numeric values
                              if (/^\d{10}$/i.test(value)) {
                                return Promise.resolve();
                              } else {
                                return Promise.reject(
                                  "Invalid phone number. Please enter a 10-digit numeric phone number."
                                );
                              }
                            },
                          },
                        ]}
                      >
                        <Input
                          addonBefore={<PhoneOutlined />}
                          placeholder="Phone"
                          size="large"
                        />
                      </Form.Item>

                      <Form.Item
                        name="address"
                        hasFeedback
                        validateDebounce={500}
                        rules={[
                          {
                            required: true,
                            message: "Please input your address!",
                          },
                        ]}
                      >
                        <Input
                          addonBefore={<HomeOutlined />}
                          placeholder="Address"
                          size="large"
                        />
                      </Form.Item>

                      <Row gutter={16}>
                        <Col span={24} md={12}>
                          <Form.Item
                            name="pincode"
                            hasFeedback
                            validateDebounce={500}
                            rules={[
                              {
                                required: true,
                                message: "Please input your pincode!",
                              },
                            ]}
                          >
                            <Input
                              addonBefore={<SafetyCertificateOutlined />}
                              placeholder="Pincode"
                              size="large"
                            />
                          </Form.Item>
                        </Col>
                        <Col span={24} md={12}>
                          <Form.Item
                            name="city"
                            hasFeedback
                            validateDebounce={500}
                            rules={[
                              {
                                required: true,
                                message: "Please input your city!",
                              },
                            ]}
                          >
                            <Input
                              addonBefore={<EnvironmentOutlined />}
                              placeholder="City"
                              size="large"
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item
                        name="state"
                        hasFeedback
                        validateDebounce={500}
                        rules={[
                          {
                            required: true,
                            message: "Please input your state!",
                          },
                        ]}
                      >
                        <Input
                          addonBefore={<EnvironmentOutlined />}
                          placeholder="State"
                          size="large"
                        />
                      </Form.Item>

                      <Form.Item
                        name="avatar"
                        valuePropName="fileList"
                        // label="Upload Profile Picture"
                        getValueFromEvent={normFile}
                        // className="fw-bolder"
                      >
                        <ImgCrop rotationSlider showReset>
                          <Upload
                            action={uploadProfilePicture}
                            listType="picture-card"
                            fileList={fileList}
                            onChange={onChange}
                            onPreview={onPreview}
                            maxCount={1} // Set maximum upload count to 1
                          >
                            {fileList.length < 1 && "+ Upload Profile"}
                          </Upload>
                        </ImgCrop>
                      </Form.Item>

                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="w-100 SignUp_btn "
                          size="large"
                        >
                          Sign Up
                        </Button>
                      </Form.Item>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
              <Col lg={4} md={3} sm={1}></Col>
            </Row>
          </Container>
        </main>
      </CommonLayout>
    </>
  );
};

export default Signup;
