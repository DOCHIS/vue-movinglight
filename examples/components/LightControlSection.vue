<template>
  <div class="control-section">
    <h3>{{ title }}</h3>
    <div v-for="control in controls" :key="control.name" class="control-group">
      <label class="control-label">
        <template v-if="control.type !== 'checkbox' && control.label">
          <span class="label-text"
            >{{ control.label }}: {{ displayValue(control) }}</span
          >
        </template>

        <div
          :class="{
            'auto-control': control.hasAuto,
            'control-input': true,
          }"
        >
          <!-- Range Input -->
          <input
            v-if="control.type === 'range'"
            type="range"
            v-model.number="modelValue[control.name]"
            :min="control.min"
            :max="control.max"
            class="slider"
            :disabled="autoValuesComputed[control.name]"
            @input="handleInput(control.name, $event)"
          />

          <!-- Color Input -->
          <input
            v-else-if="control.type === 'color'"
            type="color"
            v-model="modelValue[control.name]"
            class="color-picker"
            :disabled="autoValuesComputed[control.name]"
            @input="handleInput(control.name, $event)"
          />

          <!-- Select Input -->
          <select
            v-else-if="control.type === 'select'"
            v-model="modelValue[control.name]"
            class="select-input"
            @change="handleInput(control.name, $event)"
          >
            <option
              v-for="option in control.options"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>

          <!-- Number Input -->
          <input
            v-else-if="control.type === 'number'"
            type="number"
            v-model.number="modelValue[control.name]"
            :min="control.min"
            :max="control.max"
            class="number-input"
            @input="handleInput(control.name, $event)"
          />

          <!-- Checkbox Input -->
          <label v-else-if="control.type === 'checkbox'" class="checkbox-label">
            <input
              type="checkbox"
              v-model="modelValue[control.name]"
              @change="handleInput(control.name, $event)"
            />
            {{ control.label }}
          </label>

          <!-- Auto Movement Checkbox -->
          <label v-if="control.hasAuto" class="checkbox-label auto-checkbox">
            <input
              type="checkbox"
              v-model="autoValuesComputed[control.name]"
              @change="handleAutoChange(control.name, $event)"
            />
            Auto
          </label>
        </div>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface ControlOption {
  value: string | number | boolean;
  label: string;
}

interface Control {
  name: string;
  type: "range" | "color" | "select" | "number" | "checkbox";
  label?: string;
  min?: number;
  max?: number;
  options?: ControlOption[];
  hasAuto?: boolean;
  unit?: string;
}

interface Props {
  title: string;
  controls: Control[];
  modelValue: Record<string, any>;
  autoValues: Record<string, boolean>; // Changed from optional to required
}

const props = withDefaults(defineProps<Props>(), {
  autoValues: () => ({}), // Provide default empty object
});

const emit = defineEmits<{
  (e: "update:modelValue", value: Record<string, any>): void;
  (e: "update:autoValues", value: Record<string, boolean>): void;
  (e: "autoChange", name: string, enabled: boolean): void;
}>();

const autoValuesComputed = computed({
  get: () => props.autoValues,
  set: (newValue) => {
    emit("update:autoValues", newValue);
  },
});

const displayValue = (control: Control) => {
  const value = props.modelValue[control.name];
  if (control.unit) {
    return `${value}${control.unit}`;
  }
  return value;
};

const handleInput = (name: string, event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.type === "checkbox" ? target.checked : target.value;

  emit("update:modelValue", {
    ...props.modelValue,
    [name]: value,
  });
};

const handleAutoChange = (name: string, event: Event) => {
  const target = event.target as HTMLInputElement;
  const enabled = target.checked;

  emit("update:autoValues", {
    ...props.autoValues,
    [name]: enabled,
  });
  emit("autoChange", name, enabled);
};
</script>

<style scoped lang="scss">
.control-section {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 12px; // Reduced from 16px
  margin-bottom: 12px; // Reduced from 16px

  h3 {
    margin: 0 0 8px; // Reduced from 16px
    font-size: 1em; // Reduced from 1.1em
    font-weight: 500;
  }
}

.control-group {
  margin-bottom: 6px; // Reduced from 12px
}

.control-label {
  display: flex;
  flex-direction: column;
  gap: 2px; // Reduced from 4px
}

.label-text {
  font-size: 0.9em; // Added to make text slightly smaller
  line-height: 1.2; // Added for compact text height
}

.auto-control {
  display: flex;
  align-items: center;
  gap: 6px; // Reduced from 8px

  .slider,
  .color-picker,
  .select-input {
    flex: 1;
  }
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 4px;
  user-select: none;
  font-size: 0.9em; // Added to make checkbox text smaller
}

.auto-checkbox {
  min-width: 50px; // Reduced from 60px
}

.control-input {
  margin-top: 2px; // Reduced from 4px
}

.slider {
  width: 100%;
  height: 4px; // Added to make slider more compact
  &::-webkit-slider-thumb {
    height: 12px; // Added for compact thumb
    width: 12px; // Added for compact thumb
  }
}

.number-input {
  width: 70px; // Reduced from 80px
  height: 24px; // Added to make input more compact
  padding: 2px 4px; // Added for compact padding
  font-size: 0.9em; // Added to make text smaller
}

.select-input {
  padding: 2px 6px; // Reduced from 4px 8px
  border-radius: 4px;
  height: 24px; // Added to make select more compact
  font-size: 0.9em; // Added to make text smaller
}

.color-picker {
  width: 40px; // Reduced from 50px
  height: 24px; // Reduced from 30px
  padding: 0;
  border: none;
  border-radius: 4px;
}
</style>
