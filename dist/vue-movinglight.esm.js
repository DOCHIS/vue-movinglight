import { defineComponent, computed, openBlock, createElementBlock, normalizeClass, normalizeStyle, createElementVNode } from "vue";
const _hoisted_1 = { class: "light-base" };
const _hoisted_2 = { class: "light-head" };
const _hoisted_3 = { class: "light-yoke" };
const _hoisted_4 = { class: "light-fixture" };
const _hoisted_5 = ["data-facets"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MovingLight",
  props: {
    position: { default: "top" },
    positionType: { default: "fixed" },
    pan: { default: 0 },
    tilt: { default: 0 },
    panSpeed: { default: 90 },
    tiltSpeed: { default: 90 },
    color: { default: "#ffffff" },
    intensity: { default: 100 },
    beamWidth: { default: 10 },
    beamLength: { default: 1e3 },
    prismEnabled: { type: Boolean, default: false },
    prismFacets: { default: 3 },
    prismRotation: { default: 0 }
  },
  setup(__props) {
    const props = __props;
    const calculateMovementTime = (currentAngle, targetAngle, speed) => {
      const diff = Math.abs(targetAngle - currentAngle);
      return `${diff / speed}s`;
    };
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
        "--prism-rotation": `${props.prismRotation}deg`
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["moving-light", `mount-${props.position}`]),
        style: normalizeStyle(lightStyle.value)
      }, [
        createElementVNode("div", _hoisted_1, [
          createElementVNode("div", _hoisted_2, [
            createElementVNode("div", _hoisted_3, [
              createElementVNode("div", _hoisted_4, [
                createElementVNode("div", {
                  class: normalizeClass(["light-beam", { "with-prism": props.prismEnabled }]),
                  "data-facets": props.prismFacets
                }, null, 10, _hoisted_5)
              ])
            ])
          ])
        ])
      ], 6);
    };
  }
});
const index = {
  install: (app) => {
    app.component("MovingLight", _sfc_main);
    app.component("moving-light", _sfc_main);
  }
};
export {
  _sfc_main as MovingLight,
  index as default
};
//# sourceMappingURL=vue-movinglight.esm.js.map
