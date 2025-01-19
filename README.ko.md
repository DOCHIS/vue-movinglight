# Vue Moving Light

<p align="center">
  <a href="./README.md">English</a> |
  <a href="#readme">한국어</a>
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

[데모 보기](https://stackblitz.com/~/github.com/DOCHIS/vue-movinglight) · [버그 신고](https://github.com/DOCHIS/vue-movinglight/issues) · [기능 요청](https://github.com/DOCHIS/vue-movinglight/issues)

</div>

Vue.js 애플리케이션을 위한 커스터마이징 가능한 무빙라이트 컴포넌트입니다. 동적인 조명 효과, 무대 조명 시뮬레이션, 인터랙티브한 UI 요소를 만드는 데 활용할 수 있습니다.

<p align="center">
  <img src="./docs/preview.gif" alt="Vue Moving Light 데모" width="600px">
  <img src="./docs/preview2.gif" alt="Vue Moving Light 데모" width="600px">
</p>

## 주요 기능

- 🎯 정밀한 팬/틸트(Pan/Tilt) 제어
- 🎨 빔 색상과 밝기 조절
- 🌈 프리즘 효과 지원
- ⚡ 설정 가능한 속도의 부드러운 애니메이션
- 📱 모든 화면 크기에 대응하는 반응형 디자인
- 💪 TypeScript로 작성된 완벽한 타입 지원
- 🎮 프로그래밍 방식의 간편한 제어

## 데모

인터랙티브 플레이그라운드에서 Vue Moving Light를 직접 체험해보세요:

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/~/github.com/DOCHIS/vue-movinglight)

## 설치 방법

```bash
# npm
npm install vue-movinglight

# yarn
yarn add vue-movinglight

# pnpm
pnpm add vue-movinglight
```

## 사용 방법

### 전역 등록

```typescript
// main.ts
import { createApp } from "vue";
import MovingLight from "vue-movinglight";
import "vue-movinglight/dist/style.css";

const app = createApp(App);
app.use(MovingLight);
```

### 지역 등록

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

## Props 속성

| Prop          | 타입                                   | 기본값    | 설명                             |
| ------------- | -------------------------------------- | --------- | -------------------------------- |
| position      | 'top' \| 'left' \| 'right' \| 'bottom' | 'top'     | 무빙라이트가 설치될 위치         |
| positionType  | 'fixed' \| 'absolute'                  | 'fixed'   | CSS position 타입                |
| pan           | number                                 | 0         | 팬(좌우) 각도 (-270 ~ +270도)    |
| tilt          | number                                 | 0         | 틸트(상하) 각도 (-135 ~ +135도)  |
| panSpeed      | number                                 | 90        | 팬 이동 속도 (초당 1-540도)      |
| tiltSpeed     | number                                 | 90        | 틸트 이동 속도 (초당 1-270도)    |
| color         | string                                 | '#ffffff' | CSS 색상 형식의 빔 색상          |
| intensity     | number                                 | 100       | 빔 강도 백분율 (0-100)           |
| beamWidth     | number                                 | 10        | 빔 너비 (0-180도)                |
| beamLength    | number                                 | 1000      | 빔 길이 (0-10000 픽셀)           |
| prismEnabled  | boolean                                | false     | 프리즘 효과 활성화 여부          |
| prismFacets   | number                                 | 3         | 프리즘 면 개수 (2-5)             |
| prismRotation | number                                 | 0         | 프리즘 회전 각도 (-360 ~ +360도) |

## 예제

### 기본 사용법

```vue
<template>
  <MovingLight />
</template>
```

### 고급 설정

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

### 인터랙티브 예제

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

## 브라우저 지원

- Chrome (최신 버전)
- Firefox (최신 버전)
- Safari (최신 버전)
- Edge (최신 버전)

## 기여하기

기여는 언제나 환영합니다! Pull Request를 제출해 주세요. 주요 변경사항의 경우, 먼저 Issue를 열어 논의해 주시기 바랍니다.

1. 저장소를 포크합니다
2. 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 열어주세요

## 개발

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm run dev

# 프로덕션용 빌드
npm run build

# 테스트 실행
npm run test
```

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다 - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.
