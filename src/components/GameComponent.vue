<template>
  <MDBCard class="border border-dark rounded-0">
    <MDBCardBody
      class="d-flex gap-2 justify-content-between align-items-center"
    >
      <MDBBtn
        class="border border-dark rounded-0"
        size="lg"
        v-on:click="hitClicked"
        :disabled="hit"
        >Hit</MDBBtn
      >
      <div class="text-center">
        <div><strong>Current Bid:</strong> ${{ bidAmount }}</div>
        <div><strong>Wallet Balance:</strong> ${{ walletMoney }}</div>
      </div>
      <MDBBtn
        class="border border-dark rounded-0"
        size="lg"
        v-on:click="standClicked"
        :disabled="stand"
        >Stand</MDBBtn
      >
    </MDBCardBody>
  </MDBCard>
</template>

<script setup lang="ts">
import { MDBBtn, MDBCard, MDBCardBody } from "mdb-vue-ui-kit";

defineProps<{
  bidAmount: number;
  walletMoney: number;
  hit: boolean;
  stand: boolean;
}>();
const emits = defineEmits<{
  (e: "requestToStand"): void;
  (e: "requestToPickCard"): void;
}>();
const standClicked = (): void => {
  emits("requestToStand");
};
const hitClicked = (): void => {
  emits("requestToPickCard");
};
</script>

<style scoped></style>
