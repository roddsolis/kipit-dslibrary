import React from "react";
import "../../styles/pages-styles/main-page-style.scss";
import Foundations from "../mdx-page/foundations.mdx";
import DesignTokens from "../mdx-page/design-tokens.mdx";

const MainContent = () => {
  return (
    <div className="MainContent">
      {/* <DesignTokens /> */}
      <Foundations />
    </div>
  );
};

export default MainContent;
