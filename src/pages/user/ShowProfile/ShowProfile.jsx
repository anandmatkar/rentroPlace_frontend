import React, { useEffect, useState } from "react";
import UserLayout from "../../../layouts/UserLayout";
import "./ShowProfile.css";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { UserOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Avatar } from "antd";
import MetaDataPageInfo from "../../../utils/metaDataInfo";
import removeAuthenticationToken from "../../../utils/removeAuthenticationToken";
import { fetchShowProfile } from "../../../ReduxToolkit/auth/authSlice";

export default function ShowProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({});
  const [userAddresses, setUserAddresses] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await dispatch(fetchShowProfile()).unwrap();
      if (response?.data?.status === 200) {
        const userData = response?.data?.data?.[0];

        if (userData) {
          setUserData(userData);

          const userAddresses = userData?.addresses;
          // console.log("useraddd", userAddresses);
          setUserAddresses(userAddresses ?? []);
        } else {
          toast.error("Invalid user data structure");
          // Handle the case where user data is not in the expected format
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

    fetchProfile();
  }, [dispatch, navigate]);

  return (
    <>
      <MetaDataPageInfo
        title="Rent91 - User Profile"
        description="Your page description"
        keywords="React, JavaScript, Web Development"
        favicon="/path/to/favicon.png"
      />

      <UserLayout>
        <main className="fluid-container">
          <div className="featured_product pt-5 pb-2">
            <h1 className="text-center fw-bolder pb-2">User Profile</h1>

            <Container>
              <Row>
                <Col sm={12} lg={6}>
                  <Card className="my-4 ProfileDetailsCard">
                    <Card.Header className="text-center">
                      Profile Details
                    </Card.Header>
                    <Card.Body>
                      <center className="profileImage">
                        <Avatar
                          size={300}
                          icon={<UserOutlined />}
                          src={userData.avatar}
                          alt="User Profile Picture"
                        />
                      </center>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={12} lg={6}>
                  <Card className="my-4 gereralInfoCard">
                    <Card.Header>General Information</Card.Header>
                    <ListGroup>
                      <ListGroup.Item>
                        <strong>Name : </strong>
                        {userData.first_name} {userData.last_name}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Email : </strong>
                        {userData.email}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Mobile : </strong>
                        {userData.phone}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                  <Card className="my-4 addressInfoCard">
                    <Card.Header>Address Information</Card.Header>
                    <ListGroup>
                      <ListGroup.Item>
                        <strong>City :</strong>{" "}
                        {userAddresses && userAddresses.length > 0
                          ? userAddresses[0].city
                          : "N/A"}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Pincode</strong> :{" "}
                        {userAddresses && userAddresses.length > 0
                          ? userAddresses[0].pincode
                          : "N/A"}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>State</strong> :{" "}
                        {userAddresses && userAddresses.length > 0
                          ? userAddresses[0].state
                          : "N/A"}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                  <Row className="mb-4">
                    <Col sm={12} lg={6}>
                      <Button
                        className=" w-100 showUpdateProfile"
                        size="lg"
                        as={NavLink}
                        to={"/user/update-profile"}
                      >
                        Update Profile
                      </Button>
                    </Col>
                    <Col sm={12} lg={6}>
                      <Button
                        className="w-100 showChangePass"
                        size="lg"
                        as={NavLink}
                        to={"/user/change-password"}
                      >
                        Change Password
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
              
            </Container>
          </div>
        </main>
      </UserLayout>
    </>
  );
}
