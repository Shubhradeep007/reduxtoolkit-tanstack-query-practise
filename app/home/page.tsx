"use client";

import Navbarmenu from "@/app/_components/navbar";

const Homepage = () => {
  // const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  // console.log("API URL:", apiUrl);
  return (
    <>
      <nav className="flex justify-end px-8 py-4">
        <Navbarmenu />
      </nav>
    </>
  );
};

export default Homepage;
