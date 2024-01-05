// layouts/CommonLayout.js

import React from "react";
import MainNavigation from "../components/common/MainNavigation";
import MainFooter from "../components/common/MainFooter";

const CommonLayout = ({ children }) => {
  return (
    <>
      <MainNavigation />
      <div>{children}</div>
      <MainFooter />
    </>
  );
};

export default CommonLayout;
