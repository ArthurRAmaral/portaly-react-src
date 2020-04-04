import React from "react";
import "../../css/Loading.css";

const CircleLoading = () => {
   return (
      <div className="preloader-wrapper medium active ">
         <div className="spinner-layer ">
            <div className="circle-clipper left">
               <div className="circle "></div>
            </div>
            <div className="gap-patch">
               <div className="circle "></div>
            </div>
            <div className="circle-clipper right">
               <div className="circle   "></div>
            </div>
         </div>
      </div>
   );
};

export default CircleLoading;
