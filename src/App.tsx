import React from 'react';
import MusicTable from './components/MusicTable';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Music Mode Chart</h1>
        <div className="bg-white rounded-lg shadow-lg">
          <MusicTable />
        </div>
      </div>
    </div>
  );
}

export default App;