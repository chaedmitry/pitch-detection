import React from "react";
import PitchDetector from "../components/PitchDetector";
import "../styles/globals.css"

const App = () => {
  return (
    <div className="contaner">
      <h1>Find Pitch</h1>
      <PitchDetector />
    </div>
  );
};

export default App;