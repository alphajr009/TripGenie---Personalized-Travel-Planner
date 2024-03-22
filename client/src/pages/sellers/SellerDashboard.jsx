import React, { useState } from "react";
import SellerNavbar from "../../components/seller/SellerNavbar";
import Home from "../../components/seller/Home";
import Property from "../../components/seller/Property";
import Reviews from "../../components/seller/Reviews";
import "../../css/sellerdasboard.css";

function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("home");

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return <Home />;
      case "property":
        return <Property />;
      case "reviews":
        return <Reviews />;
      default:
        return <Home />;
    }
  };

  return (
    <div>
      <SellerNavbar setActiveTab={setActiveTab} />
      <div className="dashboard-content">{renderTabContent()}</div>
    </div>
  );
}

export default SellerDashboard;
