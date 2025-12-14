import { Box } from "@chakra-ui/layout";
import { useEffect, useRef } from "react";

interface StarParticle {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
  speed: number;
  drift: number;
  type: "btc" | "eth";
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

const LAYERS = [
  { count: 45, speed: 12, sizeRange: [0.4, 1], alphaRange: [0.1, 0.22] },
  { count: 32, speed: 18, sizeRange: [0.6, 1.6], alphaRange: [0.14, 0.28] },
  { count: 20, speed: 26, sizeRange: [0.9, 2.1], alphaRange: [0.18, 0.34] },
];

const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const pickInRange = (seed: number, min: number, max: number) =>
  min + pseudoRandom(seed) * (max - min);

function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number>();
  const starsRef = useRef<StarParticle[]>([]);
  const shootingRef = useRef<ShootingStar | null>(null);
  const nextShootRef = useRef<number>(0);
  const sizeRef = useRef<{ width: number; height: number; dpr: number }>({
    width: 0,
    height: 0,
    dpr: 1,
  });

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const createStars = (width: number, height: number) => {
      const stars: StarParticle[] = [];
      LAYERS.forEach((layer, layerIndex) => {
        for (let i = 0; i < layer.count; i += 1) {
          const seed = layerIndex * 997 + i + 1;
          stars.push({
            x: pseudoRandom(seed * 1.7) * width,
            y: pseudoRandom(seed * 2.1) * height,
            size: pickInRange(seed * 3.5, layer.sizeRange[0], layer.sizeRange[1]),
            baseAlpha: pickInRange(seed * 4.2, layer.alphaRange[0], layer.alphaRange[1]),
            twinkleSpeed: pickInRange(seed * 5.9, 0.6, 1.4),
            phase: pseudoRandom(seed * 7.3) * Math.PI * 2,
            speed: layer.speed * pickInRange(seed * 8.1, 0.8, 1.3),
            drift: pickInRange(seed * 9.4, -4, 4),
            type: pseudoRandom(seed * 10.7) > 0.5 ? "btc" : "eth",
          });
        }
      });
      starsRef.current = stars;
    };

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      sizeRef.current = { width, height, dpr };

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      createStars(width, height);
    };

    const scheduleNextShoot = (now: number) => {
      nextShootRef.current = now + (8 + pseudoRandom(now * 0.13) * 5) * 1000;
    };

    resize();
    scheduleNextShoot(performance.now());

    let lastTime = performance.now();

    const render = (time: number) => {
      animationRef.current = requestAnimationFrame(render);
      const { width, height } = sizeRef.current;
      if (!width || !height) {
        return;
      }

      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      const stars = starsRef.current;
      const twinkleTime = time / 1000;

      stars.forEach((star, index) => {
        star.y += star.speed * delta;
        star.x += star.drift * delta * 0.3;

        if (star.y > height + star.size) {
          star.y = -star.size;
          star.x = pseudoRandom((index + 1) * 11.7) * width;
        }
        if (star.x > width + star.size) {
          star.x = -star.size;
        } else if (star.x < -star.size) {
          star.x = width + star.size;
        }

        const alpha = star.baseAlpha + Math.sin(twinkleTime * star.twinkleSpeed + star.phase) * 0.09;
        const opacity = Math.max(0.05, Math.min(alpha, 0.5));
        if (star.type === "btc") {
          const radius = star.size * 4;
          ctx.beginPath();
          ctx.fillStyle = `rgba(249, 107, 44, ${opacity + 0.15})`;
          ctx.arc(star.x, star.y, radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.font = `${radius * 1.2}px "Space Mono", monospace`;
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity + 0.2})`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("Ƀ", star.x, star.y);
        } else {
          const size = star.size * 6;
          ctx.beginPath();
          ctx.moveTo(star.x, star.y - size);
          ctx.lineTo(star.x + size * 0.6, star.y);
          ctx.lineTo(star.x, star.y + size);
          ctx.lineTo(star.x - size * 0.6, star.y);
          ctx.closePath();
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity + 0.1})`;
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(star.x, star.y + size * 0.2);
          ctx.lineTo(star.x + size * 0.45, star.y);
          ctx.lineTo(star.x, star.y + size * 0.8);
          ctx.lineTo(star.x - size * 0.45, star.y);
          ctx.closePath();
          ctx.fillStyle = `rgba(120, 135, 255, ${opacity + 0.1})`;
          ctx.fill();
        }
      });

      const now = time;
      if (!shootingRef.current && now >= nextShootRef.current) {
        shootingRef.current = {
          x: pseudoRandom(now * 0.41) * width,
          y: -20,
          vx: 240 + pseudoRandom(now * 0.53) * 140,
          vy: 160 + pseudoRandom(now * 0.67) * 120,
          life: 0,
          maxLife: 0.75,
        };
        scheduleNextShoot(now);
      }

      const shooting = shootingRef.current;
      if (shooting) {
        shooting.life += delta;
        shooting.x += shooting.vx * delta;
        shooting.y += shooting.vy * delta;

        const lifeRatio = 1 - shooting.life / shooting.maxLife;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255,255,255,${Math.max(lifeRatio, 0)})`;
        ctx.lineWidth = 1;
        ctx.moveTo(shooting.x, shooting.y);
        ctx.lineTo(shooting.x - shooting.vx * 0.06, shooting.y - shooting.vy * 0.06);
        ctx.stroke();

        if (
          shooting.life >= shooting.maxLife ||
          shooting.x > width + 120 ||
          shooting.y > height + 120
        ) {
          shootingRef.current = null;
        }
      }
    };

    animationRef.current = requestAnimationFrame(render);
    window.addEventListener("resize", resize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <Box position="fixed" inset={0} zIndex={0} pointerEvents="none">
      <Box
        position="absolute"
        inset={0}
        bgGradient="radial(at top, rgba(233, 107, 44, 0.2), transparent)"
      />
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </Box>
  );
}

export default StarBackground;
