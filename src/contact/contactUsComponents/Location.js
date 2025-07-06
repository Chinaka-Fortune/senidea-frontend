import React from 'react';
import './Location.css';

const Location = () => {
  return (
    <div>
      <iframe
        title="Senidea Location Map"
        className="map mt-5 w-100"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019!2d-122.419415!3d37.774929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjciTiAxMjLCsDI1JzA5LjkiVw!5e0!3m2!1sen!2sus!4v1625098765432!5m2!1sen!2sus"
        allowFullScreen="true"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default Location;