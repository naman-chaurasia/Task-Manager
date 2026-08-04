import React, { useEffect, useRef } from "react";

export default function ThreeParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Create 3D floating particle mesh
    const numParticles = 65;
    const particles = [];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * width,
        radius: Math.random() * 2.5 + 1,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.5,
        color: i % 2 === 0 ? "rgba(124, 92, 255, " : "rgba(167, 139, 250, "
      });
    }

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX - width / 2) * 0.05;
      mouseY = (e.clientY - height / 2) * 0.05;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const fov = 350;
      const centerX = width / 2;
      const centerY = height / 2;

      // Draw connecting 3D grid lines for particles near each other
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx + mouseX * 0.01;
        p1.y += p1.vy + mouseY * 0.01;
        p1.z += p1.vz;

        // Wrap around boundaries
        if (p1.z < 1) p1.z = width;
        if (p1.z > width) p1.z = 1;
        if (p1.x < -width) p1.x = width;
        if (p1.x > width) p1.x = -width;
        if (p1.y < -height) p1.y = height;
        if (p1.y > height) p1.y = -height;

        const scale = fov / (fov + p1.z);
        const x2d = p1.x * scale + centerX;
        const y2d = p1.y * scale + centerY;
        const alpha = Math.min(1, Math.max(0.1, scale * 0.8));

        // Draw particle node
        ctx.beginPath();
        ctx.arc(x2d, y2d, p1.radius * scale * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `${p1.color}${alpha})`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#7C5CFF";
        ctx.fill();

        // Connect 3D line mesh
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 220) {
            const scale2 = fov / (fov + p2.z);
            const x2d_2 = p2.x * scale2 + centerX;
            const y2d_2 = p2.y * scale2 + centerY;
            const lineAlpha = (1 - dist / 220) * 0.25 * alpha;

            ctx.beginPath();
            ctx.moveTo(x2d, y2d);
            ctx.lineTo(x2d_2, y2d_2);
            ctx.strokeStyle = `rgba(124, 92, 255, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
    />
  );
}
