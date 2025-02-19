"use client";

import React, { useState } from "react";
import Link from "next/link";
import "../styles/components-styles/menuItem-style.scss";
import { ChevronRight, ChevronDown } from "lucide-react";

const MenuItem = ({ itemName, subItems = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="MenuItem-container">
      <div className="MenuItem-header" onClick={() => setIsOpen(!isOpen)}>
        {itemName}
        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </div>

      {isOpen && (
        <ul className="MenuItem-content">
          {subItems.map((subItem, index) => (
            <li key={index}>
              <Link href={subItem.href}>{subItem.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MenuItem;
