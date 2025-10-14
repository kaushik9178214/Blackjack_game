<template>
  <MDBContainer>
    <MDBCard class="border border-dark">
      <MDBCardTitle tag="h2" class="text-center"
        >Premium BlackJack</MDBCardTitle
      >
      <hr />
      <MDBCardBody class="d-grid gap-2">
        <MDBRow>
          <MDBCardTitle class="text-center">
            Dealer
            <span v-if="store.cardsOfDealer.length">
              : {{ store.displayedDealerPoints }} points
            </span>
          </MDBCardTitle>
        </MDBRow>
        <MDBRow>
          <MDBCol class="d-flex gap-3 justify-content-center">
            <CardComponent
              v-if="!store.winner && store.dealerHiddenCard"
              card=""
              symbol=""
            />
            <CardComponent
              v-if="store.winner && store.dealerHiddenCard"
              :card="store.dealerHiddenCard.value.name"
              :symbol="store.dealerHiddenCard.symbol"
            />
            <CardComponent
              v-for="(card, index) in store.cardsOfDealer"
              :key="index"
              :card="card.value.name"
              :symbol="card.symbol"
            />
          </MDBCol>
        </MDBRow>
        <MDBRow class="d-flex justify-content-center">
          <MDBCol col="5">
            <GameComponent
              v-on:requestToStand="finishPicking"
              v-bind:bidAmount="store.bidAmount"
              v-bind:walletMoney="store.walletMoney"
              v-bind:hit="hit"
              v-bind:stand="stand"
              v-on:requestToPickCard="store.hit"
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

        <ModalComponent
          v-bind:bidError="store.bidError"
          v-bind:winner="store.winner"
          v-on:exit="store.redirectToHome"
          v-on:makeBid="store.newRound"
          v-model="store.modalController"
          v-on:requestToStartGame="startGame"
        />
      </MDBCardBody>
    </MDBCard>
  </MDBContainer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CardComponent from "../components/CardComponent.vue";
import GameComponent from "../components/GameComponent.vue";
import ModalComponent from "../components/ModalComponent.vue";
import { useCardStore } from "../store/card-store";

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-vue-ui-kit";

const store = useCardStore();
const buttonToggle = ref<boolean>(false);

const hit = ref<boolean>(false);
const stand = ref<boolean>(false);
const startGame = (amount: number): void => {
  store.bidAmount = Number(amount);
  store.startGame();
  buttonToggle.value = true;
  stand.value = false;
  hit.value = false;
};
const finishPicking = (): void => {
  hit.value = true;
  stand.value = true;
  store.stand();
};
</script>

<style scoped></style>
