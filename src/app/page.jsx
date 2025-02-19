import React from "react";
import MainContent from "./main/[slug].jsx";
import NavigationDrawer from "@/components/NavigationDrawer.jsx";
import Header from "@/components/Header.jsx";

const Main = () => {
  return (
    <>
      <Header />
      <NavigationDrawer />
      <MainContent />
    </>
  );
};

export default Main;
