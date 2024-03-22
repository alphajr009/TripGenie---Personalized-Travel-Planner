import React from "react";
import "../../css/sellernav.css";
import { FaHome, FaBuilding, FaStar } from "react-icons/fa";

function SellerNavbar({ setActiveTab }) {
  return (
    <div className="seller-navbar">
      <div className="seller-title">Seller Dashboard</div>
      <div className="tab-buttons">
        <button onClick={() => setActiveTab("home")}>
          <div className="tab-btn-wrapper">
            <div className="tab-btn-wrapper-icon">
              <FaHome size={24} />
            </div>
            <div className="tab-btn-wrapper-name">
              <span>Home</span>
            </div>
          </div>
        </button>

        <button onClick={() => setActiveTab("property")}>
          <div className="tab-btn-wrapper">
            <div className="tab-btn-wrapper-icon">
              <FaBuilding size={24} />
            </div>
            <div className="tab-btn-wrapper-name">
              <span>Property</span>
            </div>
          </div>
        </button>

        <button onClick={() => setActiveTab("reviews")}>
          <div className="tab-btn-wrapper">
            <div className="tab-btn-wrapper-icon">
              <FaStar size={24} />
            </div>
            <div className="tab-btn-wrapper-name">
              <span>Reviews</span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default SellerNavbar;
