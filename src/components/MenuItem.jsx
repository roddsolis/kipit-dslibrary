"use client";

import React, { useState } from "react";
import "../styles/components-styles/menuItem-style.scss";
import { ChevronRight, ChevronDown } from "lucide-react";

const MenuItem = ({ itemName, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="MenuItem-container">
      <div className="MenuItem-header" onClick={() => setIsOpen(!isOpen)}>
        {itemName}
        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </div>
      {/* {isOpen && <div className="MenuItem-content">{children}</div>} */}
      {isOpen && (
        <div className="MenuItem-content">
          <li>tipografia</li>
          <li>colores</li>
          <li>espaciados</li>
        </div>
      )}
    </div>
  );
};

export default MenuItem;
