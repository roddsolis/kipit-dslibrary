import React from "react";
import MenuItem from "./MenuItem";
import "../styles/components-styles/navigation-drawer-style.scss";

const NavigationDrawer = () => {
  return (
    <div className="NavigationDrawer">
      <MenuItem itemName="Foundations" />
      <MenuItem itemName="Design tokens" />
      <MenuItem itemName="Components" />
      <MenuItem itemName="Brand" />
      <MenuItem itemName="Icons" />
    </div>
  );
};

export default NavigationDrawer;
