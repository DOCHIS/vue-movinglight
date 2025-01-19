// types.ts
export interface MovingLightProps {
  position: "top" | "left" | "right" | "bottom";
  positionType: "fixed" | "absolute";
  pan: number;
  tilt: number;
  panSpeed: number;
  tiltSpeed: number;
  color: string;
  intensity: number;
  beamWidth: number;
  beamLength: number;
  prismEnabled: boolean;
  prismFacets: number;
  prismRotation: number;
  verticalOffset?: number;
  horizontalOffset?: number;
  isMobile?: boolean;
}
