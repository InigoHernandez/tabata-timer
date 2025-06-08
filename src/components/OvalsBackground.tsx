
import React from 'react';

const OvalsBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
      {/* Large oval */}
      <div 
        className="absolute animate-pulse"
        style={{
          width: '800px',
          height: '400px',
          border: '1px solid rgba(254, 100, 23, 0.2)',
          borderRadius: '50%',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%) rotate(-15deg)',
          animationDuration: '4s',
          animationDelay: '0s'
        }}
      />
      
      {/* Medium oval */}
      <div 
        className="absolute animate-pulse"
        style={{
          width: '600px',
          height: '300px',
          border: '1px solid rgba(254, 100, 23, 0.15)',
          borderRadius: '50%',
          top: '30%',
          right: '10%',
          transform: 'rotate(25deg)',
          animationDuration: '5s',
          animationDelay: '1s'
        }}
      />
      
      {/* Small oval */}
      <div 
        className="absolute animate-pulse"
        style={{
          width: '400px',
          height: '200px',
          border: '1px solid rgba(254, 100, 23, 0.1)',
          borderRadius: '50%',
          bottom: '20%',
          left: '15%',
          transform: 'rotate(-30deg)',
          animationDuration: '6s',
          animationDelay: '2s'
        }}
      />
      
      {/* Extra large subtle oval */}
      <div 
        className="absolute animate-pulse"
        style={{
          width: '1000px',
          height: '500px',
          border: '1px solid rgba(254, 100, 23, 0.08)',
          borderRadius: '50%',
          top: '10%',
          left: '20%',
          transform: 'rotate(10deg)',
          animationDuration: '8s',
          animationDelay: '0.5s'
        }}
      />
    </div>
  );
};

export default OvalsBackground;
