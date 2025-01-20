import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MovingLight from "../components/MovingLight.vue";

describe("MovingLight", () => {
  // Test default props
  it("renders properly with default props", () => {
    const wrapper = mount(MovingLight);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.classes()).toContain("moving-light");
    expect(wrapper.classes()).toContain("mount-top");
  });

  // Test position prop
  it("applies correct position class based on prop", () => {
    const wrapper = mount(MovingLight, {
      props: {
        position: "left",
      },
    });
    expect(wrapper.classes()).toContain("mount-left");
  });

  // Test style props
  it("applies correct CSS variables based on props", () => {
    const wrapper = mount(MovingLight, {
      props: {
        pan: 45,
        tilt: -30,
        color: "#ff0000",
        intensity: 80,
        beamWidth: 15,
      },
    });

    const style = wrapper.attributes("style");
    expect(style).toContain("--pan-angle: 45deg");
    expect(style).toContain("--tilt-angle: -30deg");
    expect(style).toContain("--beam-color: #ff0000");
    expect(style).toContain("--beam-width: 15");
    expect(style).toContain("--beam-intensity: 0.8");
  });

  // Test prism effects
  it("applies prism effect when enabled", () => {
    const wrapper = mount(MovingLight, {
      props: {
        prismEnabled: true,
        prismFacets: 3,
        prismRotation: 45,
      },
    });

    const beam = wrapper.find(".light-beam");
    expect(beam.classes()).toContain("with-prism");
    expect(beam.attributes("data-facets")).toBe("3");
    expect(wrapper.attributes("style")).toContain("--prism-rotation: 45deg");
  });
});
