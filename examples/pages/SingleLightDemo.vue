<template>
  <div class="demo-container">
    <div class="stage" ref="stageRef">
      <MovingLight :style="lightPositionStyle" v-bind="lightProps" />
      <div class="stage-floor"></div>
    </div>

    <div class="controls-panel">
      <div class="control-sections">
        <LightControlSection
          title="Stage Position (Display Only)"
          :controls="positionControls"
          v-model="displayPosition"
        />

        <LightControlSection
          title="Basic Settings"
          :controls="basicControls"
          v-model="lightProps"
        />

        <LightControlSection
          title="Movement"
          :controls="movementControls"
          v-model="lightProps"
          v-model:autoValues="autoMovementState"
          @autoChange="handleAutoMovementChange"
        />

        <LightControlSection
          title="Beam Properties"
          :controls="beamControls"
          v-model="lightProps"
          v-model:autoValues="autoMovementState"
          @autoChange="handleAutoMovementChange"
        />

        <LightControlSection
          title="Prism"
          :controls="prismControls"
          v-model="lightProps"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, onBeforeUnmount } from "vue";
import type { MovingLightProps } from "../types";
import LightControlSection from "../components/LightControlSection.vue";
import "../styles/SingleLightDemo.scss";

const stageRef = ref<HTMLElement | null>(null);
const stageSize = ref({ width: 0, height: 0 });
const displayPosition = ref({ top: 0, left: 0 });

const autoIntervals = ref<Record<string, number>>({});
const autoMovementState = ref({
  pan: false,
  tilt: false,
  color: false,
  intensity: false,
  beamWidth: false,
  beamLength: false,
  panSpeed: false,
  tiltSpeed: false,
});

const lightProps = ref<MovingLightProps>({
  position: "top",
  positionType: "absolute",
  pan: 50,
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

const positionControls = computed(() => [
  {
    name: "top",
    type: "range" as const,
    label: "Top",
    min: 0,
    max: stageSize.value.height,
    unit: "px",
  },
  {
    name: "left",
    type: "range" as const,
    label: "Left",
    min: 0,
    max: stageSize.value.width,
    unit: "px",
  },
]);

const basicControls = [
  {
    name: "positionType",
    type: "select" as const,
    label: "Position Type",
    options: [
      { value: "absolute", label: "Absolute" },
      { value: "fixed", label: "Fixed" },
    ],
  },
  {
    name: "position",
    type: "select" as const,
    label: "Mount Position",
    options: [
      { value: "top", label: "Top" },
      { value: "left", label: "Left" },
      { value: "right", label: "Right" },
      { value: "bottom", label: "Bottom" },
    ],
  },
];

const movementControls = [
  {
    name: "pan",
    type: "range" as const,
    label: "Target Pan",
    min: -270,
    max: 270,
    unit: "°",
    hasAuto: true,
  },
  {
    name: "tilt",
    type: "range" as const,
    label: "Target Tilt",
    min: -135,
    max: 135,
    unit: "°",
    hasAuto: true,
  },
  {
    name: "panSpeed",
    type: "range" as const,
    label: "Pan Speed",
    min: 1,
    max: 540,
    unit: "°/s",
    hasAuto: true,
  },
  {
    name: "tiltSpeed",
    type: "range" as const,
    label: "Tilt Speed",
    min: 1,
    max: 270,
    unit: "°/s",
    hasAuto: true,
  },
];

const beamControls = [
  {
    name: "color",
    type: "color" as const,
    label: "Color",
    hasAuto: true,
  },
  {
    name: "intensity",
    type: "range" as const,
    label: "Intensity",
    min: 0,
    max: 100,
    unit: "%",
    hasAuto: true,
  },
  {
    name: "beamWidth",
    type: "range" as const,
    label: "Beam Width",
    min: 0,
    max: 180,
    unit: "°",
    hasAuto: true,
  },
  {
    name: "beamLength",
    type: "range" as const,
    label: "Beam Length",
    min: 0,
    max: 10000,
    unit: "px",
    hasAuto: true,
  },
];

const prismControls = computed(() => [
  {
    name: "prismEnabled",
    type: "checkbox" as const,
    label: "Enable Prism",
  },
  ...(lightProps.value.prismEnabled
    ? [
        {
          name: "prismFacets",
          type: "number" as const,
          label: "Prism Facets",
          min: 2,
          max: 5,
        },
        {
          name: "prismRotation",
          type: "range" as const,
          label: "Prism Rotation",
          min: -360,
          max: 360,
          unit: "°",
        },
      ]
    : []),
]);

const updateMovement = (prop: string) => {
  switch (prop) {
    case "pan":
      lightProps.value.pan = Number(Math.floor(Math.random() * 540 - 270));
      break;
    case "tilt":
      lightProps.value.tilt = Number(Math.floor(Math.random() * 270 - 135));
      break;
    case "color":
      lightProps.value.color = `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`;
      break;
    case "intensity":
      lightProps.value.intensity = Number(Math.floor(Math.random() * 101));
      break;
    case "beamWidth":
      lightProps.value.beamWidth = Number(Math.floor(Math.random() * 181));
      break;
    case "beamLength":
      lightProps.value.beamLength = Number(Math.floor(Math.random() * 10001));
      break;
    case "panSpeed":
      lightProps.value.panSpeed = Number(Math.floor(Math.random() * 540) + 1);
      break;
    case "tiltSpeed":
      lightProps.value.tiltSpeed = Number(Math.floor(Math.random() * 270) + 1);
      break;
  }
};

const handleAutoMovementChange = (prop: string, enabled: boolean) => {
  if (!enabled) {
    clearInterval(autoIntervals.value[prop]);
    delete autoIntervals.value[prop];
  } else {
    updateMovement(prop);
    autoIntervals.value[prop] = window.setInterval(() => {
      updateMovement(prop);
    }, 2000);
  }
};

const lightPositionStyle = computed(() => ({
  position: lightProps.value.positionType,
  top: `${displayPosition.value.top}px`,
  left: `${displayPosition.value.left}px`,
}));

onMounted(() => {
  if (stageRef.value) {
    const { clientWidth, clientHeight } = stageRef.value;
    stageSize.value = { width: clientWidth, height: clientHeight };
    displayPosition.value = { top: 0, left: clientWidth / 2 };

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      stageSize.value = { width, height };
    });

    observer.observe(stageRef.value);
  }
});

watch(
  () => stageSize.value,
  (newSize) => {
    displayPosition.value = {
      left: Math.min(displayPosition.value.left, newSize.width),
      top: Math.min(displayPosition.value.top, newSize.height),
    };
  },
  { deep: true }
);

onBeforeUnmount(() => {
  Object.values(autoIntervals.value).forEach(clearInterval);
  autoIntervals.value = {};
});
</script>
