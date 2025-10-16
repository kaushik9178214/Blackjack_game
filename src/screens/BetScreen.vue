<template>
  <MDBContainer>
    <MDBRow class="d-flex justify-content-center height align-items-center">
      <MDBCol cols="12" md="5">
        <h2 class="text-center">Make your Bet</h2>
        <BetComponent
          v-bind:bidError="store.bidError"
          v-model:walletMoney="store.walletMoney"
          v-on:requestToStartGame="startGame"
        />
      </MDBCol>
    </MDBRow>
  </MDBContainer>
</template>

<script setup lang="ts">
import { MDBCol, MDBContainer, MDBRow } from "mdb-vue-ui-kit";
import BetComponent from "../components/BetComponent.vue";
import { useCardStore } from "../store/card-store";
const store = useCardStore();
const startGame = (amount: number): void => {
  store.bidAmount = Number(amount);
  store.startGame();
};
</script>

<style scoped>
.height {
  height: 80vh;
}
</style>
