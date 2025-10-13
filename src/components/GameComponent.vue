<template>
  <div>
    <div>Current Bid: {{ bidAmount }}</div>
    <MDBBtn :disabled="buttonToggle" v-on:click="makeBet">Bet</MDBBtn>
    <MDBBtn v-on:click="hitClicked" :disabled="hit">Hit</MDBBtn>
    <MDBBtn v-on:click="standClicked" :disabled="stand">Stand</MDBBtn>
    <div>{{ playerName }}<span v-if="points">{{": "+ points +" points" }}</span></div>
  </div>
</template>

<script setup lang="ts">
import { MDBBtn } from "mdb-vue-ui-kit";

defineProps<{
  bidAmount: number;
  playerName: string;
  points:number,
  buttonToggle: boolean;
  hit: boolean;
  stand: boolean;
}>();
const emits = defineEmits<{
  (e: "requestToMakeBet"): void;
  (e: "requestToStand"): void;
  (e: "requestToPickCard"): void;
}>();
const makeBet = (): void => {
  emits("requestToMakeBet");
};
const standClicked = (): void => {
  emits("requestToStand");
};
const hitClicked = (): void => {
  emits("requestToPickCard");
};
</script>

<style scoped></style>
