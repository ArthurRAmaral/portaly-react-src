//From dependencies
import React from "react";

const TopHeader = () => {
   return (
      <div className="sup-header blue-grey lighten-4">
         <div className="Contato sup-header-content">Contato</div>
         <div className="sup-header-content">
            <a className="Go-to-email" href="mailto:portalyportas@gmail.com">
               portalyportas@gmail.com{" "}
            </a>
         </div>
         <div className="Tel sup-header-content">
            tel: <a href="tel:3125222915">(31) 2522-2915</a>
         </div>
      </div>
   );
};

export default TopHeader;
