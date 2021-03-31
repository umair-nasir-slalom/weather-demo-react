import React from 'react';
import './App.scss';
import WeatherHome from "./weather/Weather";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WeatherHome />
      </header>
    </div>
  );
}

export default App;
