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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserProfile, logout } from "@/hooks/redux-toolkit/slice/auth.slice";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbarmenu = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    Cookies.remove("x-access-token");
    dispatch(logout());
    router.push("/login");
  };

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const navItems = isAuthenticated
    ? [
      { name: "Add Products", link: "/dashboard/addproducts" },
      { name: "View Products", link: "/dashboard/productlist" },
    ]
    : [
      { name: "Login", link: "/login" },
      { name: "Signup", link: "/signup" },
    ];

  return (
    <Navbar>
      <NavBody>
        <div className="flex w-full items-center justify-between">
          <Link href="/">
          <NavbarLogo />
          </Link>
          <div className="flex items-center gap-4">
            <NavItems items={navItems} />
            {isAuthenticated && user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/dashboard/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
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
