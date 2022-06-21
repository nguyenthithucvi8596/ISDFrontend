import React from "react";
import PropTypes from "prop-types";
import Footer from "components/Core/Footer/Footer";
import Header from "components/Core/Header/Header";
import Sidebar from "components/Core/Sidebar/Sidebar";
import structure from "components/Core/Sidebar/SidebarStructure";
import { Outlet } from "react-router-dom";
export const DashboardPage = () => {
  return (
    <div>
      <Header />
      <Sidebar structure={structure} />
      <Outlet />
      <Footer />
    </div>
  );
};

DashboardPage.propTypes = {};
