import React, { useState, useEffect } from 'react';

const HMRTest = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // CHANGE THIS TEXT AND SAVE TO TEST HMR
  const testText = "Edit this text and save to test Hot Module Replacement";

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: '#10b981',
      color: 'white',
      padding: '15px',
      borderRadius: '8px',
      zIndex: 9999,
      maxWidth: '300px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>🔥 HMR Test</h3>
      <div style={{ fontSize: '12px', marginBottom: '8px' }}>
        <div>✅ WebSocket: Connected</div>
        <div>🕐 Live Time: {time}</div>
      </div>
      <div style={{
        background: '#059669',
        padding: '8px',
        borderRadius: '4px',
        fontSize: '11px',
        marginTop: '8px'
      }}>
        <strong>Test:</strong> {testText}
      </div>
      <div style={{ fontSize: '10px', marginTop: '8px', opacity: 0.8 }}>
        Change the text above, save, and watch for updates
      </div>
    </div>
  );
};

export default HMRTest;
