import React, { useEffect, useState } from "react";

const Countdown = () => {
  const calculateTimeLeft = () => {
    const christmasDate = new Date("2024-12-25T00:00:00");
    const now = new Date();
    const timeDifference = christmasDate - now;

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="text-center relative z-10 p-8">
        <h1 className="text-5xl font-bold text-white mb-4">
          Christmas Countdown
        </h1>
        <div className="grid grid-cols-4 gap-4">
          {["Days", "Hours", "Minutes", "Seconds"].map((label, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-white text-black p-6 rounded-lg shadow-md text-3xl md:text-5xl font-semibold">
                {timeLeft[label.toLowerCase()] < 10
                  ? `0${timeLeft[label.toLowerCase()]}`
                  : timeLeft[label.toLowerCase()]}
              </div>
              <div className="text-xl font-medium mt-2 text-white">{label}</div>
            </div>
          ))}
        </div>
        <p className="text-white mt-4 text-xl">
          Only a few days left! Get ready for the festivities!
        </p>
      </div>
    </>
  );
};

export default Countdown;
