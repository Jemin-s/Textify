import React from "react";

const ServiceCard = ({ title, content }) => {
  return (
    <div className="service-card">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

export default ServiceCard;