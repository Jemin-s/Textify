import React from "react";
import PropTypes from "prop-types";

const ServiceCard = ({ title, content }) => {
  return (
    <div className="service-card">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

ServiceCard.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

export default ServiceCard;