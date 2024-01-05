import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import CommonLayout from "../../layouts/CommonLayout";
import MetaDataPageInfo from "../../utils/metaDataInfo";
import "./Error403.css";

export default function Error403() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/");
  };

  return (
    <>
      <MetaDataPageInfo
        title="Rent91 - Unauthorized"
        description="Your page description"
        keywords="React, JavaScript, Web Development"
        favicon="/path/to/favicon.png"
      />

      <CommonLayout>
        <Result
          className="antd-result-error-403-page"
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          extra={
            <Button type="primary" onClick={handleButtonClick}>
              Back to Home Page
            </Button>
          }
        />
      </CommonLayout>
    </>
  );
}
