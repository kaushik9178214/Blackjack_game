<template>
  <MDBContainer>
    <MDBCard class="border border-dark rounded-0">
      <MDBCardBody class="d-flex flex-column gap-3 p-1">
        <MDBRow class="align-items-center">
          <!-- Left empty column -->
          <!-- <MDBCol></MDBCol> -->

          <!-- Center text column -->
          <!-- offset -->
          <MDBCol class="text-center h2">
            <span class="text-danger">♥♦ </span>
            <span>Blackjack</span>
            <span> ♠♣</span>
          </MDBCol>

          <!-- Right icons column -->
          <MDBCol class="d-flex justify-content-end gap-2">
            <MDBIcon
              icon="redo"
              iconStyle="fas"
              size="lg"
              class="pointer text-success"
              v-on:click="store.newRound"
            />
            <MDBIcon
              icon="sign-out-alt"
              iconStyle="fas"
              class="pointer text-danger"
              size="lg"
              v-on:click="store.redirectToHome"
            />
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCardTitle class="text-center">
            Dealer
            <span> : {{ store.dealerPoints }} points </span>
            <!-- v-if="store.winner" -->
            <!-- <span v-else>
              :
              {{ store.dealerPoints - store.cardsOfDealer[0]?.value.value! }}
              points
            </span> -->
          </MDBCardTitle>
        </MDBRow>

        <MDBRow>
          <MDBCol col="12" class="d-flex gap-3 justify-content-center">
            <!-- <CardComponent
              
                       
              card="?"
              :symbol="store.cardsOfDealer[0]?.symbol!"
            /> -->
            <CardComponent
              v-if="store.winner"
              v-for="(card, index) in store.cardsOfDealer"
              :key="index"
              :card="card.value.name"
              :symbol="card.symbol"
            />
            <!-- .slice(1) -->
            <CardComponent
              v-if="!store.status"
              v-for="(card, index) in store.cardsOfDealer"
              :key="index"
              :card="card.value.name"
              :symbol="card.symbol"
            />
            <CardBackComponent v-if="!store.winner" />
          </MDBCol>
        </MDBRow>
        <MDBRow class="d-flex justify-content-center">
          <MDBCol sm="10" md="8" lg="5">
            <GameComponent
              v-on:requestToStand="finishPicking"
              v-bind:bidAmount="store.bidAmount"
              v-bind:walletMoney="store.walletMoney"
              v-bind:hit="store.hitController"
              v-bind:stand="store.standController"
              v-on:requestToPickCard="store.hit"
              v-bind:winner="store.winner"
            ></GameComponent>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol col="12" class="d-flex gap-3 justify-content-center">
            <CardComponent
              v-for="card in store.cardsOfUser"
              :card="card.value.name"
              :symbol="card.symbol"
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCardTitle class="text-center">
            {{ store.playerName
            }}<span v-if="store.playerPoints">{{
              ": " + store.playerPoints + " points"
            }}</span>
          </MDBCardTitle>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  </MDBContainer>
</template>

<script setup lang="ts">
import { watch } from "vue";
import CardComponent from "../components/CardComponent.vue";
import GameComponent from "../components/GameComponent.vue";

import { useCardStore } from "../store/card-store";

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
} from "mdb-vue-ui-kit";
import CardBackComponent from "../components/CardBackComponent.vue";

const store = useCardStore();

// const hit = ref<boolean>(false);
// const stand = ref<boolean>(false);

const finishPicking = (): void => {
  store.hitController = true;
  store.standController = true;
  store.stand();
};
// do it when a action is performed
watch(
  () => store.status,
  () => {
    store.hitController = true;
    store.standController = true;
  }
);
// watch(
//   () => store.playerPoints,
//   () => {
//     if(store.playerPoints==21){
//       hit.value=true
//     }

//   }
// );
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
