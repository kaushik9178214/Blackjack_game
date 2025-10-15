<template>
  
    <MDBCard :style="{width: '5rem', height: '8rem'}"
      :class="
        symbol == '♥' || symbol == '♦'
          ? 'border border-danger'
          : 'border border-dark'
      "
      class="rounded-0"
    >
      <div class="p-2">
        <div :class="color">{{ card }}</div>
        <div :class="color" class="fs-1 text-center">{{ symbol }}</div>
        <div :class="color" class="text-end">{{ card }}</div>
      </div>
    </MDBCard>
  
</template>

<script setup lang="ts">
import { MDBCard } from "mdb-vue-ui-kit";
import { computed } from "vue";

const props = defineProps<{
  card: string;
  symbol: string;
}>();
const color = computed(() => {
  if (props.symbol == "♥" || props.symbol == "♦") {
    return "text-danger";
  } else {
    return "text-dark";
  }
});
</script>

<style scoped></style>
