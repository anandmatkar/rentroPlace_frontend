import React, { useEffect, useState } from "react";
import UserLayout from "../../../layouts/UserLayout";
import "./UpdateProfile.css";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import {
  UserOutlined,
  MailOutlined,
  EnvironmentOutlined,
  SafetyCertificateOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Avatar, Form, Input, Upload } from "antd";
import MetaDataPageInfo from "../../../utils/metaDataInfo";
import {
  editUserProfile,
  fetchShowProfile,
  uploadUserProfilePhoto,
} from "../../../ReduxToolkit/auth/authSlice";
import ImgCrop from "antd-img-crop";
import removeAuthenticationToken from "../../../utils/removeAuthenticationToken";

export default function UpdateProfile() {
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
    const updateUserData = { ...values, avatar: avatarPath };
    const response = await dispatch(editUserProfile(updateUserData)).unwrap();
    if (response.data.status === 200) {
      toast.success(response.data.message);
      setAvatarPath("");
      navigate(-1);
    } else if (response.data.status === 401) {
      toast.error(response.data.message);
      removeAuthenticationToken();
      navigate("/signin");
    } else {
      toast.error(response.data.message);
    }
  };

  // const normFile = (e) => {
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e && e.fileList;
  // };

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

  useEffect(() => {
    const fetchProfileData = async () => {
      const response = await dispatch(fetchShowProfile()).unwrap();
      //   console.log(response);
      if (response?.data?.status === 200) {
        const userData = response?.data?.data?.[0];

        if (userData) {
          // Use setFieldsValue to populate the form fields
          form.setFieldsValue({
            first_name: userData.first_name,
            last_name: userData.last_name,
            email: userData.email,
            address:
              userData?.addresses && userData?.addresses.length > 0
                ? userData?.addresses[0].address
                : "N/A",
            pincode:
              userData?.addresses && userData?.addresses.length > 0
                ? userData?.addresses[0].pincode
                : "N/A",
            city:
              userData?.addresses && userData?.addresses.length > 0
                ? userData?.addresses[0].city
                : "N/A",
            state:
              userData?.addresses && userData?.addresses.length > 0
                ? userData?.addresses[0].state
                : "N/A",
          });

          const userAddresses = userData?.addresses;
          if (userAddresses.length > 0) {
          }
          setAvatarPath(userData.avatar);
        } else {
          toast.error("Invalid User Data.");
        }
      } else if (response.data.status === 401) {
        toast.error(response.data.message);
        removeAuthenticationToken();
        navigate("/signin");
      } else {
        const errorMessage = response?.data?.message ?? "An error occurred";
        toast.error(errorMessage);
      }
    };

    fetchProfileData();
  }, [form, dispatch, navigate]);

  return (
    <>
      <MetaDataPageInfo
        title="Rent91 - User Update Profile"
        description="Your page description"
        keywords="React, JavaScript, Web Development"
        favicon="/path/to/favicon.png"
      />

      <UserLayout>
        <main className="fluid-container">
          <div className="featured_product pt-5 pb-2">
            <h1 className="text-center fw-bolder pb-2">Update User Profile</h1>

            <Container>
              <Form
                form={form}
                name="signup"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                className="updateProfileForm my-4"
              >
                <Row>
                  <Col sm={12} lg={6}>
                    <Card className=" UpdateProfileDetails">
                      <Card.Header className="text-center">
                        Profile Details
                      </Card.Header>
                      <Card.Body>
                        <center className="UpdateProfileImage">
                          <Avatar
                            size={300}
                            icon={<UserOutlined />}
                            src={avatarPath}
                            alt="User Profile Picture"
                          />
                        </center>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col sm={12} lg={6}>
                    <Card className=" UpdateProfileDetails">
                      <Card.Header className="text-center">
                         General Information
                      </Card.Header>
                      <Card.Body className="pt-4 pb-3">
                          <Row >
                              <Col md={6} sm={6} className="ps-0 colPadding">
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
                              <Col md={6} sm={6} className="pe-0 colPadding">
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
                              readOnly
                              disabled
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
                          <Row >
                              <Col md={6} sm={6} className="ps-0 colPadding">
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
                              <Col md={6} sm={6} className="pe-0 colPadding">
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
                          <Form.Item name="avatar" valuePropName="fileList" className="mb-0">
                            <ImgCrop rotationSlider showReset>
                              <Upload
                                action={uploadProfilePicture}
                                // beforeUpload={uploadProfilePicture}
                                listType="picture-card"
                                fileList={fileList}
                                onChange={onChange}
                                onPreview={onPreview}
                                maxCount={1}
                              >
                                <div className="profileUploadBox">
                                  <span className="material-symbols-outlined profileUpload">
                                    person
                                  </span>
                                  Upload Profile
                                </div>
                              </Upload>
                            </ImgCrop>
                          </Form.Item>
                        </Card.Body>
                    </Card>
                    
                  </Col>
                </Row>
                <Row className="pt-3">
                  <Col sm={12} lg={4}></Col>
                  <Col sm={12} lg={4}>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmltype="submit"
                        className="w-100 SignUp_btn "
                        size="large"
                      >
                        Update Profile
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col sm={12} lg={4}></Col>
                </Row>
              </Form>
            </Container>
          </div>
        </main>
      </UserLayout>
    </>
  );
}
