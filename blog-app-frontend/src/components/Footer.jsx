import React from "react";

function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="footer_container">
      <h1 className="footer">
        All Rights Reserved &#169; <span className="year">{year}</span>
      </h1>
    </div>
  );
}

export default Footer;
