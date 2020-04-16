import React from "react";
import "../../css/components/WppBtn.css";
export default () => (
   <a
      href={
         "https://api.whatsapp.com/send?phone=553125222915&text=Ol%C3%A1%2C%20Portaly!"
      }
      className="wpp-btn"
      target="_blank"
      rel="noopener noreferrer"
   >
      <i className="fa fa-whatsapp wpp-btn-ico"></i>
   </a>
);
