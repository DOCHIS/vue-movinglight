import { defineComponent as c, computed as m, openBlock as r, createElementBlock as f, normalizeClass as s, normalizeStyle as u, createElementVNode as e } from "vue";
const h = { class: "light-base" }, g = { class: "light-head" }, _ = { class: "light-yoke" }, b = { class: "light-fixture" }, v = ["data-facets"], l = /* @__PURE__ */ c({
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
    prismEnabled: { type: Boolean, default: !1 },
    prismFacets: { default: 3 },
    prismRotation: { default: 0 }
  },
  setup(i) {
    const t = i, o = (a, n, p) => `${Math.abs(n - a) / p}s`, d = m(() => {
      const a = o(0, t.pan, t.panSpeed), n = o(0, t.tilt, t.tiltSpeed);
      return {
        position: t.positionType,
        "--pan-angle": `${t.pan}deg`,
        "--tilt-angle": `${t.tilt}deg`,
        "--pan-duration": a,
        "--tilt-duration": n,
        "--beam-color": t.color,
        "--beam-width": t.beamWidth,
        "--beam-length": `${t.beamLength}px`,
        "--beam-intensity": t.intensity / 100,
        "--prism-rotation": `${t.prismRotation}deg`
      };
    });
    return (a, n) => (r(), f("div", {
      class: s(["moving-light", `mount-${t.position}`]),
      style: u(d.value)
    }, [
      e("div", h, [
        e("div", g, [
          e("div", _, [
            e("div", b, [
              e("div", {
                class: s(["light-beam", { "with-prism": t.prismEnabled }]),
                "data-facets": t.prismFacets
              }, null, 10, v)
            ])
          ])
        ])
      ])
    ], 6));
  }
}), S = {
  install: (i) => {
    i.component("MovingLight", l), i.component("moving-light", l);
  }
};
export {
  l as MovingLight,
  S as default
};
