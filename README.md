# Vue Moving Light

<p align="center">
  <a href="#readme">English</a> |
  <a href="./README.ko.md">한국어</a>
</p>

<div align="center">

[![npm version](https://img.shields.io/npm/v/vue-movinglight.svg?color=blue)](https://www.npmjs.com/package/vue-movinglight)
[![license](https://img.shields.io/npm/l/vue-movinglight.svg)](https://github.com/DOCHIS/vue-movinglight/blob/main/LICENSE)
[![npm downloads](https://img.shields.io/npm/dm/vue-movinglight.svg?color=blue)](https://www.npmjs.com/package/vue-movinglight)
[![GitHub stars](https://img.shields.io/github/stars/DOCHIS/vue-movinglight.svg?style=social)](https://github.com/DOCHIS/vue-movinglight/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/DOCHIS/vue-movinglight.svg?style=social)](https://github.com/DOCHIS/vue-movinglight/network/members)
[![GitHub issues](https://img.shields.io/github/issues/DOCHIS/vue-movinglight.svg)](https://github.com/DOCHIS/vue-movinglight/issues)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Vue.js](https://img.shields.io/badge/Vue.js-%3E%3D%203.0.0-green.svg)](https://vuejs.org/)

[Live Demo](https://vue-movinglight.vercel.app/) · [Try on StackBlitz](https://stackblitz.com/~/github.com/DOCHIS/vue-movinglight) · [Report Bug](https://github.com/DOCHIS/vue-movinglight/issues) · [Request Feature](https://github.com/DOCHIS/vue-movinglight/issues)

</div>

A customizable moving light component for Vue.js applications, perfect for creating dynamic lighting effects, stage lighting simulations, or interactive UI elements.

<p align="center">
  <img src="./docs/preview.gif" alt="Vue Moving Light Demo" width="600px">
  <img src="./docs/preview2.gif" alt="Vue Moving Light Demo" width="600px">
</p>

## Features

- 🎯 Precise pan and tilt control
- 🎨 Customizable beam color and intensity
- 🌈 Built-in prism effect support
- ⚡ Smooth animations with configurable speeds
- 📱 Responsive and adaptable to any screen size
- 💪 Written in TypeScript with full type support
- 🎮 Easy to control programmatically

## Demo

Experience Vue Moving Light:

- [Live Demo](https://vue-movinglight.vercel.app/)
- [Interactive Playground on StackBlitz](https://stackblitz.com/~/github.com/DOCHIS/vue-movinglight)

[![Vue Moving Light Demo](./docs/preview.gif)](https://vue-movinglight.vercel.app/)

## Installation

```bash
# npm
npm install vue-movinglight

# yarn
yarn add vue-movinglight

# pnpm
pnpm add vue-movinglight
```

## Usage

### Global Registration

```typescript
// main.ts
import { createApp } from "vue";
import MovingLight from "vue-movinglight";
import "vue-movinglight/dist/style.css";

const app = createApp(App);
app.use(MovingLight);
```

### Local Registration

```vue
<script setup lang="ts">
import { MovingLight } from "vue-movinglight";
import "vue-movinglight/dist/style.css";
</script>

<template>
  <MovingLight
    position="top"
    :pan="45"
    :tilt="-30"
    color="#00ff00"
    :intensity="80"
  />
</template>
```

## Props

| Prop          | Type                                   | Default   | Description                                       |
| ------------- | -------------------------------------- | --------- | ------------------------------------------------- |
| position      | 'top' \| 'left' \| 'right' \| 'bottom' | 'top'     | Position where the moving light is mounted        |
| positionType  | 'fixed' \| 'absolute'                  | 'fixed'   | CSS position type for the light element           |
| pan           | number                                 | 0         | Pan angle in degrees (-270 to +270)               |
| tilt          | number                                 | 0         | Tilt angle in degrees (-135 to +135)              |
| panSpeed      | number                                 | 90        | Pan movement speed in degrees per second (1-540)  |
| tiltSpeed     | number                                 | 90        | Tilt movement speed in degrees per second (1-270) |
| color         | string                                 | '#ffffff' | Beam color in CSS color format                    |
| intensity     | number                                 | 100       | Light beam intensity percentage (0-100)           |
| beamWidth     | number                                 | 10        | Width of the light beam in degrees (0-180)        |
| beamLength    | number                                 | 1000      | Length of the light beam in pixels (0-10000)      |
| prismEnabled  | boolean                                | false     | Enable/disable prism effect                       |
| prismFacets   | number                                 | 3         | Number of prism facets (2-5)                      |
| prismRotation | number                                 | 0         | Prism rotation angle in degrees (-360 to +360)    |

## Examples

### Basic Usage

```vue
<template>
  <MovingLight />
</template>
```

### Advanced Configuration

```vue
<template>
  <MovingLight
    position="top"
    :pan="45"
    :tilt="-30"
    :panSpeed="120"
    :tiltSpeed="90"
    color="#00ff00"
    :intensity="80"
    :beamWidth="15"
    :beamLength="1500"
    :prismEnabled="true"
    :prismFacets="3"
    :prismRotation="45"
  />
</template>
```

### Interactive Example

```vue
<script setup lang="ts">
import { ref } from "vue";

const pan = ref(0);
const tilt = ref(0);

const updatePosition = (event: MouseEvent) => {
  const { clientX, clientY } = event;
  pan.value = (clientX / window.innerWidth) * 540 - 270;
  tilt.value = (clientY / window.innerHeight) * 270 - 135;
};
</script>

<template>
  <div @mousemove="updatePosition">
    <MovingLight :pan="pan" :tilt="tilt" color="#00ffff" :intensity="90" />
  </div>
</template>
```

## Browser Support

- Chrome (70+)
- Firefox (68+)
- Safari (13.1+)
- Edge (79+)
- IE is not supported

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
