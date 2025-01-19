<template>
  <div
    class="moving-light"
    :class="`mount-${props.position}`"
    :style="lightStyle"
  >
    <div class="light-base">
      <div class="light-head">
        <div class="light-yoke">
          <div class="light-fixture">
            <div
              class="light-beam"
              :class="{ 'with-prism': props.prismEnabled }"
              :data-facets="props.prismFacets"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import "../styles/movinglight.scss";
import type { MovingLightProps } from "../types";

const props = withDefaults(defineProps<MovingLightProps>(), {
  position: "top",
  positionType: "fixed",
  pan: 0,
  tilt: 0,
  panSpeed: 90,
  tiltSpeed: 90,
  color: "#ffffff",
  intensity: 100,
  beamWidth: 10,
  beamLength: 1000,
  prismEnabled: false,
  prismFacets: 3,
  prismRotation: 0,
});

// Calculate movement time based on angle difference and speed
const calculateMovementTime = (
  currentAngle: number,
  targetAngle: number,
  speed: number
): string => {
  const diff = Math.abs(targetAngle - currentAngle);
  return `${diff / speed}s`;
};

// Compute dynamic styles including movement timing
const lightStyle = computed(() => {
  const panDuration = calculateMovementTime(0, props.pan, props.panSpeed);
  const tiltDuration = calculateMovementTime(0, props.tilt, props.tiltSpeed);
  return {
    position: props.positionType,
    "--pan-angle": `${props.pan}deg`,
    "--tilt-angle": `${props.tilt}deg`,
    "--pan-duration": panDuration,
    "--tilt-duration": tiltDuration,
    "--beam-color": props.color,
    "--beam-width": props.beamWidth,
    "--beam-length": `${props.beamLength}px`,
    "--beam-intensity": props.intensity / 100,
    "--prism-rotation": `${props.prismRotation}deg`,
  };
});
</script>
