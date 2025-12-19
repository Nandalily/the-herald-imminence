import React, { useState, useEffect } from 'react';

const TestUpdate = () => {
  const [counter, setCounter] = useState(0);
  const [updateTime, setUpdateTime] = useState(new Date().toLocaleTimeString());

  // Update time every second to prove component is alive
  useEffect(() => {
    const interval = setInterval(() => {
      setUpdateTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm">
      <h3 className="font-bold text-lg mb-2">🔄 HMR Test Component</h3>
      <div className="space-y-2">
        <p>✅ WebSocket Connected</p>
        <p>🕐 Live Time: {updateTime}</p>
        <p>Counter: {counter}</p>
        <button 
          onClick={() => setCounter(c + 1)}
          className="bg-white text-green-600 px-4 py-1 rounded font-bold"
        >
          Click Me ({counter})
        </button>
        <p className="text-sm mt-3">
          <strong>Test:</strong> Change any text below and save the file.
          This box should update without page refresh.
        </p>
        <div className="mt-2 p-2 bg-green-700 rounded">
          <p className="text-xs">Edit this text → save → should update automatically</p>
        </div>
      </div>
    </div>
  );
};

export default TestUpdate;
