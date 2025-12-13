"use client";

import { useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
} from "../../components/ui/resizable-navbar";

const Navbarmenu = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Login", link: "/login" },
    { name: "Signup", link: "/signup" },
  ];

  return (
    <Navbar>
      <NavBody>
        <div className="flex w-full items-center justify-between">
          <NavbarLogo />
          <NavItems items={navItems} />
        </div>
      </NavBody>
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </MobileNavHeader>
        <MobileNavMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        >
          <NavItems
            items={navItems}
            className="relative flex flex-col space-x-0 space-y-4"
          />
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
};

export default Navbarmenu;
