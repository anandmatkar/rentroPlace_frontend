import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import CommonLayout from "../../layouts/CommonLayout";
import MetaDataPageInfo from "../../utils/metaDataInfo";
import "./Error404.css";

export default function Error404() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/");
  };

  return (
    <>
      <MetaDataPageInfo
        title="Rent91 - Page Not Found"
        description="Your page description"
        keywords="React, JavaScript, Web Development"
        favicon="/path/to/favicon.png"
      />

      <CommonLayout>
        <Result
          className="antd-result-error-404-page"
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
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
