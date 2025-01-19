<template>
  <div class="showroom">
    <!-- Epilepsy Warning Dialog -->
    <div v-if="!warningAccepted" class="warning-overlay">
      <div class="warning-dialog">
        <h2 class="warning-title">⚠️ Photosensitivity Warning</h2>
        <div class="warning-content">
          <p>
            This page contains moving lights and flashing effects that may
            trigger seizures in people with photosensitive epilepsy.
          </p>
          <ul>
            <li>
              The content includes rapid light changes and moving patterns
            </li>
            <li>
              Some people may experience discomfort, seizures, or other symptoms
            </li>
            <li>
              If you feel unwell, immediately leave the page and consult a
              doctor
            </li>
          </ul>
          <div class="warning-actions">
            <button class="btn-secondary" @click="exitShowroom">Exit</button>
            <button class="btn-primary" @click="acceptWarning">
              I Understand, Continue
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Stage Area -->
    <div v-show="warningAccepted" class="stage">
      <!-- Background Video -->
      <div class="video-container">
        <iframe
          src="https://www.youtube.com/embed/j_Y9zGhHqkQ?si=e0R8E3zCYZngWudV&autoplay=1&mute=1&loop=1&playlist=j_Y9zGhHqkQ&controls=1&showinfo=1"
          title="Background Video"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>

      <!-- Light System -->
      <div class="light-system">
        <!-- Top Lights -->
        <div
          v-for="i in lightCounts.top"
          :key="`top-${i}`"
          :style="getLightPosition('top', i)"
          class="light-mount"
        >
          <MovingLight
            position="top"
            positionType="absolute"
            v-bind="getLightProps('top', i)"
          />
        </div>

        <!-- Side Lights -->
        <div
          v-for="i in lightCounts.side"
          :key="`left-${i}`"
          :style="getLightPosition('left', i)"
          class="light-mount"
        >
          <MovingLight
            position="left"
            positionType="absolute"
            v-bind="getLightProps('left', i)"
          />
        </div>
        <div
          v-for="i in lightCounts.side"
          :key="`right-${i}`"
          :style="getLightPosition('right', i)"
          class="light-mount"
        >
          <MovingLight
            position="right"
            positionType="absolute"
            v-bind="getLightProps('right', i)"
          />
        </div>
      </div>

      <!-- Pattern Status -->
      <div class="pattern-status">
        {{ currentPattern }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const warningAccepted = ref(false);
const startTime = ref(Date.now());
const currentPattern = ref("wave");
const windowWidth = ref(window.innerWidth);
const windowHeight = ref(window.innerHeight);
let frameId: number | null = null;

const lightCounts = computed(() => {
  const MIN_SPACING = 120;
  const OPTIMAL_SPACING = 160;

  const topCount = Math.max(
    6,
    Math.min(16, Math.floor((windowWidth.value * 0.9) / OPTIMAL_SPACING))
  );
  const sideCount = Math.max(
    4,
    Math.min(10, Math.floor((windowHeight.value - 56) / OPTIMAL_SPACING))
  );

  return {
    top: topCount,
    side: sideCount,
    spacing: {
      top: (windowWidth.value * 0.9) / topCount,
      side: (windowHeight.value - 56) / sideCount,
    },
  };
});

const patterns = {
  wave: (time: number, index: number) => {
    const thinBeamChance = Math.sin(time * 0.0003 + index) > 0.7;
    const baseWidth = thinBeamChance ? 8 : 20;

    return {
      panSpeed: 130,
      pan: (Math.sin(time * 0.0005 + index * 0.3) * 270) | 0,
      tilt: (60 + Math.sin(time * 0.0003 + index * 0.2) * 30) | 0,
      beamWidth: (baseWidth + Math.sin(time * 0.001 + index * 0.5) * 5) | 0,
      beamLength: (1000 + Math.sin(time * 0.0008 + index * 0.4) * 500) | 0,
      intensity: (80 + Math.sin(time * 0.001 + index * 0.2) * 20) | 0,
      prismEnabled: Math.sin(time * 0.0005 + index) > 0,
      prismRotation: (time * 0.05) | 0,
    };
  },

  chase: (time: number, index: number) => {
    const phase = time * 0.001 + index * 0.5;
    const active = Math.sin(phase) > 0.3;
    const randomThin = Math.sin(time * 0.0007 + index * 1.1) > 0.8;

    return {
      panSpeed: 130,
      pan: (Math.sin(phase) * 180) | 0,
      tilt: (45 + Math.cos(phase) * 45) | 0,
      beamWidth: active ? (randomThin ? 10 : 25) : 15,
      beamLength: active ? 1500 : 800,
      intensity: active ? 100 : 40,
      prismEnabled: active,
      prismFacets: ((Math.sin(phase) + 2) * 1.5 + 2) | 0,
    };
  },

  circle: (time: number, index: number) => {
    const phase = time * 0.001 + index * (Math.PI / 6);
    const pulsePhase = time * 0.002 + index * 0.5;
    const thinBeamPhase = Math.sin(time * 0.0004 + index * 0.7) > 0.85;

    return {
      panSpeed: 130,
      pan: (Math.cos(phase) * 180) | 0,
      tilt: (Math.sin(phase) * 90) | 0,
      beamWidth: thinBeamPhase ? 12 : (18 + Math.sin(pulsePhase) * 8) | 0,
      beamLength: (1200 + Math.cos(pulsePhase) * 600) | 0,
      intensity: (90 + Math.sin(pulsePhase) * 10) | 0,
      prismEnabled: true,
      prismRotation: (time * 0.1 + index * 30) % 360 | 0,
      prismFacets: 3,
    };
  },

  random: (time: number, index: number) => {
    const slowTime = time * 0.0003;
    const noise =
      Math.sin(slowTime * 1.5 + index * 2.3) *
      Math.cos(slowTime * 2.1 + index * 1.5);
    const fastNoise =
      Math.sin(time * 0.002 + index) * Math.cos(time * 0.003 + index * 1.2);
    const thinBeamRandom = Math.random() > 0.8;

    return {
      panSpeed: 130,
      pan: (noise * 270) | 0,
      tilt: ((noise + 1) * 67.5) | 0,
      beamWidth: thinBeamRandom ? 10 : (20 + fastNoise * 8) | 0,
      beamLength: (1200 + fastNoise * 400) | 0,
      intensity: (85 + fastNoise * 15) | 0,
      prismEnabled: Math.abs(fastNoise) > 0.3,
      prismRotation: (time * 0.2) | 0,
      prismFacets: ((fastNoise + 1.5) * 2) | 0,
    };
  },
};

const patternNames = ["wave", "chase", "circle", "random"];

const handleResize = () => {
  windowWidth.value = window.innerWidth;
  windowHeight.value = window.innerHeight;
};

const getLightPosition = (
  position: "top" | "left" | "right",
  index: number
) => {
  if (position === "top") {
    const marginLeft = windowWidth.value * 0.05;
    return {
      position: "absolute",
      left: `${marginLeft + lightCounts.value.spacing.top * (index - 1)}px`,
      top: "calc(3.5rem + 2%)",
    };
  }

  return {
    position: "absolute",
    top: `${lightCounts.value.spacing.side * (index - 1) + 56}px`,
    [position]: "2%",
  };
};

const getLightProps = (position: string, index: number) => {
  const time = animationTime.value;
  const uniquePhase = index * 0.5 + time * 0.0001;

  const patternIndex = Math.floor(time / 2000) % patternNames.length;
  currentPattern.value = patternNames[patternIndex];

  const pattern = patterns[currentPattern.value](time, index);

  const props = {
    ...pattern,
    color: `hsl(${(uniquePhase * 20) % 360 | 0}, 90%, 60%)`,
  };

  if (position === "top") {
    props.tilt = Math.abs(props.tilt * 0.7) | 0;
  } else if (position === "left") {
    props.pan = Math.abs(props.pan * 0.5) | 0;
  } else if (position === "right") {
    props.pan = -Math.abs(props.pan * 0.5) | 0;
  }

  return props;
};

const animationTime = ref(0);
let lastUpdate = 0;
const FRAME_INTERVAL = 50;

const animate = () => {
  const now = Date.now();
  if (now - lastUpdate >= FRAME_INTERVAL) {
    animationTime.value = now - startTime.value;
    lastUpdate = now;
  }
  frameId = requestAnimationFrame(animate);
};

const startAnimation = () => {
  if (frameId) cancelAnimationFrame(frameId);
  animate();
};

const acceptWarning = () => {
  warningAccepted.value = true;
  startTime.value = Date.now();
  startAnimation();
};

const exitShowroom = () => {
  router.push("/single");
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  if (frameId) cancelAnimationFrame(frameId);
});
</script>

<style scoped>
.showroom {
  width: 100vw;
  height: calc(100vh - 3.5rem);
  max-width: 100vw;
  max-height: calc(100vh - 3.5rem);
  background: #000;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  margin-top: -3.5rem;
}

.stage {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding-top: 3.5rem;
}

.video-container {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  transform: translate(-50%, -50%);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: auto;
  aspect-ratio: 16/9;
}

.light-system {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
}

.light-mount {
  position: absolute;
}

.warning-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.warning-dialog {
  background: #1a1a1a;
  border-radius: 8px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  border: 1px solid #333;
}

.warning-title {
  color: #ff3333;
  margin: 0 0 1.5rem;
  font-size: 1.5rem;
}

.warning-content {
  color: #fff;
}

.warning-content ul {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.warning-content li {
  margin: 0.5rem 0;
}

.warning-actions {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.btn-primary,
.btn-secondary {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
}

.btn-primary {
  background: #2ecc71;
  color: white;
}

.btn-secondary {
  background: #555;
  color: white;
}

.pattern-status {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.85);
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  z-index: 3;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 0.5px;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
</style>
