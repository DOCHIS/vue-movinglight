// types.ts

/** Position where the moving light is mounted */
export type MountPosition = "top" | "left" | "right" | "bottom";

/** CSS position type for the moving light element */
export type PositionType = "fixed" | "absolute";

/**
 * Configuration properties for the MovingLight component
 */
export interface MovingLightProps {
  /**
   * Position where the moving light is mounted
   * @default "top"
   */
  position?: MountPosition;

  /**
   * CSS position type for the moving light element
   * @default "fixed"
   */
  positionType?: PositionType;

  /**
   * Target pan angle in degrees
   * Pan range is -270 to +270 degrees
   * @min -270
   * @max 270
   * @default 0
   */
  pan?: number;

  /**
   * Target tilt angle in degrees
   * Tilt range is -135 to +135 degrees
   * @min -135
   * @max 135
   * @default 0
   */
  tilt?: number;

  /**
   * Pan movement speed in degrees per second
   * @min 1
   * @max 540
   * @default 90
   */
  panSpeed?: number;

  /**
   * Tilt movement speed in degrees per second
   * @min 1
   * @max 270
   * @default 90
   */
  tiltSpeed?: number;

  /**
   * Beam color in CSS color format (hex, rgb, rgba, hsl)
   * @example "#ffffff", "rgb(255, 0, 0)", "rgba(255, 0, 0, 0.5)"
   * @default "#ffffff"
   */
  color?: string;

  /**
   * Light beam intensity percentage
   * @min 0
   * @max 100
   * @default 100
   */
  intensity?: number;

  /**
   * Width of the light beam in degrees
   * @min 0
   * @max 180
   * @default 10
   */
  beamWidth?: number;

  /**
   * Length of the light beam in pixels
   * @min 0
   * @max 10000
   * @default 1000
   */
  beamLength?: number;

  /**
   * Whether the prism effect is enabled
   * @default false
   */
  prismEnabled?: boolean;

  /**
   * Number of facets in the prism
   * @min 2
   * @max 5
   * @default 3
   */
  prismFacets?: number;

  /**
   * Rotation angle of the prism in degrees
   * @min -360
   * @max 360
   * @default 0
   */
  prismRotation?: number;
}

export declare const MovingLight: {
  new (): {
    $props: MovingLightProps;
  };
};

export default MovingLight;
