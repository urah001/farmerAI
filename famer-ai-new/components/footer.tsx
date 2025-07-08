import { Facebook, Instagram, Twitter } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <>
      <div className="flex ml-[30rem] space-x-6 mt-5">
        <p>contact us at </p>
        <Facebook />
        <Twitter />
        <Instagram />
      </div>
    </>
  );
};

export default Footer;
