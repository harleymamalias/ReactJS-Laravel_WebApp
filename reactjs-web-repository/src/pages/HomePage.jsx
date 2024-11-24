import React from "react";
import Header from "../components/Header";
import Countdown from "../components/Countdown";
import useSnowflakeAnimation from "../hooks/useSnowflakeAnimation";

const HomePage = () => {
  const canvasRef = useSnowflakeAnimation();

  return (
    <div className="relative min-h-screen flex flex-col">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      ></canvas>
      <Header />
      <div
        className="flex-grow flex justify-center items-center bg-cover bg-center"
        style={{
          backgroundImage: "url('../src/assets/images/christmas2.svg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <Countdown />
      </div>
    </div>
  );
};

export default HomePage;
