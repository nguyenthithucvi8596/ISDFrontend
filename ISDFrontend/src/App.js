import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { UserProvider } from "store/store";
import { Login } from "pages/Auth/LoginPage";
import { DashboardPage } from "pages/Dashboard/DashboardPage";
import structure from "components/Core/Sidebar/SidebarStructure";
import SidebarLink from "components/Core/Sidebar/components/SidebarLink/SidebarLink";
import Sidebar from "components/Core/Sidebar/Sidebar";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth">
          <Route
            path="login"
            element={
              <UserProvider>
                <Login />
              </UserProvider>
            }
          />
        </Route>
        {/* <Route path="Dashboard">
          <Route path="index" element={<DashboardPage />} />
        </Route> */}
        <Route element={<DashboardPage />}>
          {structure.map((item, index) => (
            <Route
              key={index}
              path={`Dashboard/${item.link}`}
              element={<DashboardPage />}
            />
          ))}
        </Route>
        {/* <Route element={<DashboardPage />}>
          <Route
            path="/"
            element={
              <div style={{ marginTop: "100px" }} className="mt-10">
                hello 123456
              </div>
            }
          />
          {structure.map((item, index) => (
            <Route
              key={index}
              // path={`dashboard/${item.link}`}
              path="index"
              element={
                <div style={{ marginTop: "100px" }} className="mt-10">
                  hello 123456789
                </div>
              }
            />
          ))}{" "}
        </Route> */}
        {/* <Route index element={<Navigate to="auth/login" replace />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
