import React, { useState, useEffect } from "react";
import Pitchfinder from "pitchfinder";

const PitchDetector = () => {
  const [pitch, setPitch] = useState({
    value: 0,
    lastUpdated: 0,
    previousValue: 0,
  });
  const [started, setStarted] = useState(false);
  const [displayedPitch, setDisplayedPitch] = useState(0);

  useEffect(() => {
    if (!started) return;
  
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const mediaStream = navigator.mediaDevices.getUserMedia({ audio: true });
  
    mediaStream.then((stream) => {
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      analyser.fftSize = 2048;
  
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
  
      const detectPitch = () => {
        analyser.getByteTimeDomainData(dataArray);
        const pitchFinder = new Pitchfinder.YIN();
        const pitchValue = pitchFinder(dataArray, audioContext.sampleRate);
        setPitch((prevPitch) => ({
          value: pitchValue,
          lastUpdated: Date.now(),
          previousValue: prevPitch.value
        }));
      };
  
      const intervalId = setInterval(detectPitch, 100);
  
      return () => {
        clearInterval(intervalId);
        analyser.disconnect();
        source.disconnect();
        mediaStream.getTracks().forEach((track) => track.stop());
      };
    });
  }, [started]);

  useEffect(() => {
    if (pitch.value) {
      setDisplayedPitch(pitch.value);
    }
  }, [pitch]);

  return (
    <div className="valueContainer">
      <button onClick={() => setStarted(true)}>Listen</button>
      {displayedPitch > 0 && (
        <div>
          <p className="pitchValue">{displayedPitch.toFixed(0)}</p>
          <p className="unit">Hz</p>
        </div>
      )}
    </div>
  );  
};

export default PitchDetector;