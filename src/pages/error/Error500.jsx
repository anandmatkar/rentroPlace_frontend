import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import CommonLayout from "../../layouts/CommonLayout";
import MetaDataPageInfo from "../../utils/metaDataInfo";
import "./Error500.css";

export default function Error500() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/");
  };

  return (
    <>
      <MetaDataPageInfo
        title="Rent91 - Server Error"
        description="Your page description"
        keywords="React, JavaScript, Web Development"
        favicon="/path/to/favicon.png"
      />

      <CommonLayout>
        <Result
          className="antd-result-error-500-page"
          status="500"
          title="500"
          subTitle="Sorry, something went wrong."
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
