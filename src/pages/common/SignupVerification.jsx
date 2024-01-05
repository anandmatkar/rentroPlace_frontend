import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  CardBody,
  Card,
  Image,
  Form,
  Button,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import CommonLayout from "../../layouts/CommonLayout";
import "./SignupVerification.css";
import { toast } from "react-toastify";
import MetaDataPageInfo from "../../utils/metaDataInfo";
import { verifyUserWithLink } from "../../ReduxToolkit/auth/authSlice";
import { useDispatch } from "react-redux";

const SignupVerification = () => {
  const { userToken } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [responseMsg, setResponseMsg] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      const response = await dispatch(verifyUserWithLink(userToken)).unwrap();
      if (response.data.status === 200) {
        handleVerificationResponse(response.data);
        // toast.success(response.data.message);
      } else {
        handleVerificationResponse(response.data);
        // toast.error(response.data.message);
      }
    };

    verifyUser();
  }, [userToken, dispatch]);

  const handleVerificationResponse = ({ status, message }) => {
    const isSuccess = status === 200;
    setResponseMsg(
      <h3
        className={`text-center my-5 text-${
          isSuccess ? "primary" : "danger"
        } fw-bolder`}
      >
        {isSuccess ? (
          <>
            User Account Verified Successfully... You can Now able to Sign In by
            Going to Sign In Page.{" "}
          </>
        ) : (
          <> User Account Verified Failed... Please Try Again. </>
        )}
      </h3>
    );
    toast[isSuccess ? "success" : "error"](message);
  };

  return (
    <>
      <MetaDataPageInfo
        title="Rent91 - User Verification"
        description="Your page description"
        keywords="React, JavaScript, Web Development"
        favicon="/path/to/favicon.png"
      />

      <CommonLayout>
        <Container className="my-5 gradient-form">
          <Row>
            <Col md={3} sm={3}></Col>
            <Col md={6} sm={6}>
              <Card className="otpVeri_form_card mt-5">
                <CardBody className="text-center">
                  <div className="pt-4">
                    <Image
                      src="/assets/images/rent91_logo.png"
                      className="otpVerirentLogo m-auto"
                      alt="logo"
                    />
                  </div>
                  <Form className="pt-4 pb-3 pl-3 pr-3">
                    <h5 className="pb-2">
                      <strong>{responseMsg}</strong>
                    </h5>
                    {/* <p>Welcome to Home Page... Go to Sign In</p> */}
                    <Button
                      as={Button}
                      className="w-100 otpVeri_btn mt-3 mb-3"
                      value="Done"
                      onClick={() => navigate("/signin")}
                    >
                      Go to Sign In
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col md={3} sm={3}></Col>
          </Row>
        </Container>
      </CommonLayout>
    </>
  );
};

export default SignupVerification;
