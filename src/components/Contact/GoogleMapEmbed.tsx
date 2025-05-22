import React from 'react';

export const GoogleMapEmbed = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '450px',
        border: '0',
        overflow: 'hidden',
      }}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2384.628688180858!2d-6.137677924208176!3d53.2961861784766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x486706225b5e0fbb%3A0x1741cdcd6e0d4044!2sDun%20Laoghaire%20Marina!5e0!3m2!1sen!2sua!4v1747467685982!5m2!1sen!2sua"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};
