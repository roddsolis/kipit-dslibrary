import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <header>
      <Image src="/logo.svg" alt="logo" width={205} height={74} />
      <form action="">
        <input type="text" placeholder="Buscar" />
      </form>
    </header>
  );
};

export default Header;
