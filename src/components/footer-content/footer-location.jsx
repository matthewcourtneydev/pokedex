import { React, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

const FooterLocation = (props) => {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <div className={`small-inner ${props.type}`}>
      <div className="back-nav">
        <div
          className="back-button"
          onClick={() => props.setIsLocationOpen((prev) => !prev)}
        >
          <IoIosArrowBack />
          <span>{`${
            props.name.charAt(0).toUpperCase() + props.name.slice(1)
          } #${props.id}`}</span>
        </div>
      </div>
      <div className={`location-info`}>
        <h1 className="dark-text">Locations</h1>
        <div className="location"></div>
      </div>
    </div>
  );
};

export default FooterLocation;
