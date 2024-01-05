// layouts/UserLayout.js

import React from "react";
import MainNavigation from "../components/common/MainNavigation";
import MainFooter from "../components/common/MainFooter";

const UserLayout = ({ children }) => {
  return (
    <>
      <MainNavigation />
      <div>{children}</div>
      <MainFooter />
    </>
  );
};

export default UserLayout;
