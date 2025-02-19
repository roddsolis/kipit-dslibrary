import React from "react";
import "../styles/global.scss";
import "../styles/layouts-styles/main-layout.scss";

import Header from "../components/Header";
import NavigationDrawer from "../components/NavigationDrawer";
import MainContent from "../components/MainContent";

export const metadata = {
  title: "Web Component Library",
  description: "estructura base para documentar componentes",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="es">
      <body>
        <Header />
        <NavigationDrawer />
        <MainContent children={children} />
      </body>
    </html>
  );
};

export default RootLayout;
