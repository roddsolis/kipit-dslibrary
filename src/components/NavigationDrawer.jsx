"use client";
import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import "../styles/components-styles/navigation-drawer-style.scss";

const NavigationDrawer = () => {
  const [menuData, setMenuData] = useState({});

  useEffect(() => {
    // Cargar dinámicamente los datos del menú
    const fetchMenuData = async () => {
      try {
        const response = await fetch("/menuData.json");
        const data = await response.json();
        setMenuData(data);
      } catch (error) {
        console.error("Error al cargar el menú:", error);
      }
    };

    fetchMenuData();
  }, []);

  return (
    <div className="NavigationDrawer">
      {Object.entries(menuData).map(([category, files]) => (
        <MenuItem
          key={category}
          itemName={category} // Nombre de la carpeta como categoría
          subItems={files.map((file) => ({
            name: file.replace(".mdx", ""), // Nombre del archivo sin extensión
            href: `/${category}/${file.replace(".mdx", "")}`, // Ruta dinámica
          }))}
        />
      ))}
    </div>
  );
};

export default NavigationDrawer;
