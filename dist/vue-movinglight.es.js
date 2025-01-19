import {
  defineComponent as h,
  computed as e,
  openBlock as y,
  createElementBlock as _,
  normalizeClass as S,
  createElementVNode as a,
  normalizeStyle as s,
} from "vue";
const P = { class: "light-head" },
  $ = { class: "light-fixture" },
  k = /* @__PURE__ */ h({
    __name: "MovingLight",
    props: {
      position: { default: "top" },
      pan: { default: 0 },
      tilt: { default: 0 },
      color: { default: "#ffffff" },
      intensity: { default: 1 },
      beamWidth: { default: 10 },
      beamLength: { default: 1e3 },
      goboPattern: { default: "none" },
      goboRotation: { default: 0 },
      prismEnabled: { type: Boolean, default: !1 },
      prismFacets: { default: 3 },
      prismRotation: { default: 0 },
    },
    setup(l) {
      const t = l,
        r = e(() => `mount-${t.position}`),
        c = e(() => {
          switch (t.position) {
            case "left":
              return -90;
            case "right":
              return 90;
            case "bottom":
              return 180;
            default:
              return 0;
          }
        }),
        d = e(() => (t.pan + c.value) % 360),
        i = e(() => {
          let n = d.value,
            o = t.tilt;
          return (
            Math.abs(o) > 90 &&
              ((n += 180), o > 90 ? (o = 180 - o) : o < -90 && (o = -180 - o)),
            { pan: n, tilt: o }
          );
        }),
        u = e(() => i.value.pan),
        p = e(() => i.value.tilt),
        m = e(() => ({
          transform: `rotate(${u.value}deg)`,
        })),
        f = e(() => ({
          transform: `rotateX(${p.value}deg)`,
        })),
        g = e(() => {
          const n =
            t.strobeSpeed > 0
              ? `opacity ${1e3 / t.strobeSpeed}ms steps(2, jump-none) infinite`
              : "none";
          return {
            "--beam-color": t.color,
            "--beam-width": `${t.beamWidth}deg`,
            "--beam-length": `${t.beamLength}px`,
            opacity: t.intensity,
            animation: n,
          };
        }),
        b = e(() => ({
          display: t.goboPattern === "none" ? "none" : "block",
          "--gobo-pattern": t.goboPattern,
          transform: `rotate(${t.goboRotation}deg)`,
        })),
        v = e(() => ({
          display: t.prismEnabled ? "block" : "none",
          "--prism-facets": t.prismFacets,
          transform: `rotate(${t.prismRotation}deg)`,
        }));
      return (n, o) => (
        y(),
        _(
          "div",
          {
            class: S(["moving-light", r.value]),
          },
          [
            a(
              "div",
              {
                class: "light-base",
                style: s(m.value),
              },
              [
                a("div", P, [
                  a(
                    "div",
                    {
                      class: "light-yoke",
                      style: s(f.value),
                    },
                    [
                      a("div", $, [
                        a(
                          "div",
                          {
                            class: "light-beam",
                            style: s(g.value),
                          },
                          [
                            a(
                              "div",
                              {
                                class: "gobo-pattern",
                                style: s(b.value),
                              },
                              null,
                              4
                            ),
                            a(
                              "div",
                              {
                                class: "prism-effect",
                                style: s(v.value),
                              },
                              null,
                              4
                            ),
                          ],
                          4
                        ),
                      ]),
                    ],
                    4
                  ),
                ]),
              ],
              4
            ),
          ],
          2
        )
      );
    },
  });
MovingLight;
const x = {
  install: (l) => {
    l.component("MovingLight", k);
  },
};
export { k as MovingLight, x as default };
