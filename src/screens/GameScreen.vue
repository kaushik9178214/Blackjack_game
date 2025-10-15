<template>
  <MDBContainer>
    <MDBCard class="border border-dark rounded-0">
      <MDBCardBody class="d-flex flex-column gap-3 p-1">
        <MDBRow
          ><MDBCol col="8" class="text-end"
            ><div tag="h2" class="ps-3 h2 pe-5 ">
              
                BlackJack <span class="text-danger">♥ ♦</span> ♠ ♣
            </div></MDBCol
          >
          <MDBCol  col="4" class="text-end">
            <MDBBtn
              class="border border-dark rounded-0"
              v-on:click="store.newRound"
              >Play Again</MDBBtn
            >
            <MDBBtn
              class="border border-dark rounded-0"
              v-on:click="store.redirectToHome"
              >Exit</MDBBtn
            >
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCardTitle class="text-center">
            Dealer
            <span v-if="store.winner"> : {{ store.dealerPoints }} points </span>
            <span v-else>
              :
              {{ store.dealerPoints - store.cardsOfDealer[0]?.value.value! }}
              points
            </span>
          </MDBCardTitle>
        </MDBRow>

        <MDBRow>
          <MDBCol col="12" class="d-flex gap-3 justify-content-center">
            <CardComponent
              v-if="!store.winner"
              
              card="?"
              :symbol="store.cardsOfDealer[0]?.symbol!"
            />
            <CardComponent
              v-if="store.winner"
              v-for="(card, index) in store.cardsOfDealer"
              :key="index"
              :card="card.value.name"
              :symbol="card.symbol"
            />
            <CardComponent
              v-if="!store.winner"
              v-for="(card, index) in store.cardsOfDealer.slice(1)"
              :key="index"
              :card="card.value.name"
              :symbol="card.symbol"
            />
          </MDBCol>
        </MDBRow>
        <MDBRow class="d-flex justify-content-center">
          <MDBCol sm="10" md="8" lg="5">
            <GameComponent
              v-on:requestToStand="finishPicking"
              v-bind:bidAmount="store.bidAmount"
              v-bind:walletMoney="store.walletMoney"
              v-bind:hit="hit"
              v-bind:stand="stand"
              v-on:requestToPickCard="store.hit"
              v-bind:winner="store.winner"
            ></GameComponent>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol class="d-flex gap-3 justify-content-center">
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
import { ref, watch } from "vue";
import CardComponent from "../components/CardComponent.vue";
import GameComponent from "../components/GameComponent.vue";

import { useCardStore } from "../store/card-store";

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-vue-ui-kit";

const store = useCardStore();

const hit = ref<boolean>(false);
const stand = ref<boolean>(false);

const finishPicking = (): void => {
  hit.value = true;
  stand.value = true;
  store.stand();
};
watch(
  () => store.winner,
  () => {
    hit.value = true;
    stand.value = true;
  }
);
</script>

<style scoped></style>
