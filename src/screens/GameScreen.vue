<template>
  <div>
    <div>Dealer<span v-if="store.dealerPoints">{{": "+ store.displayedDealerPoints + " points" }}</span></div>
    <!-- <div v-if="store.dealerPoints">
      Dealer points: {{ store.displayedDealerPoints }}
    </div> -->
    <div class="d-flex gap-3">
      <CardComponent
        v-for="(card, index) in (store.winner ? store.cardsOfDealer : store.cardsOfDealer.slice(0, -1))"
        :key="index"
        :card="card.value.name"
        :symbol="card.symbol"
      />

      <CardComponent
        v-if="!store.winner&&store.cardsOfDealer.length > 0"
        card=""
        symbol=""
      ></CardComponent>
    </div>
    
    <div class="d-flex gap-3">
      <CardComponent
        v-for="card in store.cardsOfUser"
        :card="card.value.name"
        :symbol="card.symbol"
      />
    </div>
    
   
    <GameComponent
      v-on:requestToMakeBet="store.modalToggle"
      v-on:requestToStand="finishPicking"
      v-bind:bidAmount="store.bidAmount"
      v-bind:playerName="store.playerName"
      v-bind:points="store.playerPoints"
      v-bind:hit="hit"
      v-bind:stand="stand"
      v-on:requestToPickCard="store.hit"
      :buttonToggle="buttonToggle"
    ></GameComponent>
    <ModalComponent
      v-bind:bidError="store.bidError"
      v-bind:winner="store.winner"
      v-on:exit="store.redirectToHome"
      v-on:makeBid="newRound"
      v-model="store.modalController"
      v-model:walletMoney="store.walletMoney"
      v-on:requestToStartGame="startGame"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CardComponent from "../components/CardComponent.vue";
import GameComponent from "../components/GameComponent.vue";
import ModalComponent from "../components/ModalComponent.vue";
import { useCardStore } from "../store/card-store";

const store = useCardStore();
const buttonToggle = ref<boolean>(false);

const hit = ref<boolean>(true);
const stand = ref<boolean>(true);
const startGame = (amount: number): void => {
  store.bidAmount = Number(amount);
  store.startGame();
  console.log("Cards of dealer", store.cardsOfDealer);
  console.log("Cards of user", store.cardsOfUser);
  buttonToggle.value = true;
  stand.value = false;
  hit.value = false;
};
const finishPicking = (): void => {
  hit.value = true;
  stand.value = true;
  store.stand();
};
const newRound = () => {
  store.winner = "";
  store.playerName = "";
  store.dealerPoints = 0;
  store.playerPoints = 0;
  store.turn = 1;
  store.bidAmount = 0;
  store.modalToggle();
  store.cardsOfUser = [];
  store.cardsOfDealer = [];
};
</script>

<style scoped></style>
