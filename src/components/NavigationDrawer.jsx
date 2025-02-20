"use client";
// src/components/NavigationDrawer.jsx
import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import "../styles/components-styles/navigation-drawer-style.scss";

const NavigationDrawer = () => {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    // Llama al archivo menuData.json ubicado en la carpeta public
    const fetchMenuData = async () => {
      try {
        const response = await fetch("/menuData.json");
        if (!response.ok) throw new Error("No se pudo cargar menuData.json");
        const data = await response.json();
        setMenuData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMenuData();
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  return (
    <div className="NavigationDrawer">
      {menuData.map((category, index) => (
        <MenuItem
          key={index}
          itemName={category.categoryName}
          subItems={category.subCategories.map((sub) => ({
            name: sub.subCategoryName,
            href: `/categories/${category.categoryName}/${sub.subCategoryName}`,
          }))}
        />
      ))}
    </div>
  );
};

export default NavigationDrawer;
