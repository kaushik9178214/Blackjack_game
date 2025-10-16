<template>
  <MDBCard class="border border-dark rounded-0">
    <MDBCardBody
      class="d-sm-flex d-grid gap-2 justify-content-between align-items-center"
    >
      <MDBBtn
        class="border border-danger rounded-0  p-2 text-danger"
        
        v-on:click="hitClicked"
        :disabled="hit"
        >Hit</MDBBtn
      >
      <div class="text-center">
        <div class="text-no-wrap"><strong>Current Bid:</strong> ${{ bidAmount }}</div>
        <div class="text-danger" >{{ winner }}</div>
        <div class="text-no-wrap"><strong>Wallet Balance:</strong> ${{ walletMoney }}</div>
      </div>
      <MDBBtn 
        class="border border-danger rounded-0 p-2 text-danger"
        v-on:click="standClicked"
        :disabled="stand"
        >Stay</MDBBtn
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
  winner:string
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
