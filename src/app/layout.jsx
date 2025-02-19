import React from "react";
import "../styles/global.scss";
import "../styles/layouts-styles/main-layout.scss";

export const metadata = {
  title: "Web Component Library",
  description: "estructura base para documentar componentes",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
