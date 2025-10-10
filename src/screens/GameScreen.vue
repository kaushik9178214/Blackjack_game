<template>
  <div>
    <div>Dealer</div>

    <CardComponent v-for="value in store.cardsOfDealer" :card="value.name" />
    <hr />
    <CardComponent v-for="value in store.cardsOfUser" :card="value.name" />
    <GameComponent
      v-on:requestToMakeBet="store.modalToggle"
      v-on:requestToStand="finishPicking"
      v-bind:bidAmount="store.bidAmount"
      v-bind:playerName="store.playerName"
      v-bind:hit="hit"
      v-bind:stand="stand"
      :buttonToggle="buttonToggle"
    ></GameComponent>
    <ModalComponent
      v-bind:bidError="store.bidError"
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
const hit=ref<boolean>(true)
const stand=ref<boolean>(true)
const startGame = (amount: number): void => {
  store.bidAmount = Number(amount);
  store.startGame();
  console.log(store.cardsOfDealer);
  console.log(store.cardsOfUser);
  buttonToggle.value = !buttonToggle.value;
  stand.value=!stand.value
  hit.value=!hit.value

};
const finishPicking=():void=>{
  hit.value=!hit.value
  stand.value=!stand.value
}
</script>

<style scoped></style>
