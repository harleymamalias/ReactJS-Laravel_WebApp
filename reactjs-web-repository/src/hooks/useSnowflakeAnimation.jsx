import { useEffect, useRef } from "react";

const useSnowflakeAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let snowflakes = [];

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create snowflakes
    const createSnowflakes = () => {
      for (let i = 0; i < 100; i++) {
        snowflakes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 1,
          speedY: Math.random() * 1 + 0.5,
          // Add horizontal drift
          speedX: Math.random() * 0.5 - 0.25,
        });
      }
    };

    // Animate snowflakes
    const animateSnowflakes = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      snowflakes.forEach((flake) => {
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();

        // Update position
        flake.y += flake.speedY;
        flake.x += flake.speedX;

        // Reset snowflake when it goes out of bounds
        if (flake.y > canvas.height) {
          // Reset to top
          flake.y = 0;
          // Randomize x-coordinate
          flake.x = Math.random() * canvas.width;
        }

        if (flake.x > canvas.width || flake.x < 0) {
          // Reset horizontally
          flake.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(animateSnowflakes);
    };

    createSnowflakes();
    animateSnowflakes();

    // Handle resizing
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      snowflakes = [];
      createSnowflakes();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return canvasRef;
};

export default useSnowflakeAnimation;
