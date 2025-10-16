<template>
  <div class="text-bg-success vh-100">
  <div class="d-flex justify-content-between align-items-center ">
          <MDBBtn
              v-on:click="store.newRound"
              class="rounded-0 shadow-0"
              color="light"
            >Retry</MDBBtn>
          <div  class=" d-flex fs-3 ">
            <span class="text-danger text-center">♥♦ </span>
            <span class="text-light "><strong>Blackjack</strong></span>
            <span class="text-center"> ♠♣</span>
          </div>

          
          
            
            <MDBBtn
              
              color="light "
              class="rounded-0 shadow-0"
              v-on:click="store.redirectToHome"
            > Exit</MDBBtn>
          
        </div>
  <div class="d-flex justify-content-center vh-90 align-items-center" >
    
    <MDBCard class="border border-dark rounded-0 bg-info ">
      
      <MDBCardBody class="d-flex flex-column gap-3 align-content-center justify-content-center">
        

        <div>
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
        </div>

        <div>
          <div  class="d-flex gap-3 justify-content-center">
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
          </div>
        </div>
        <div class="d-flex justify-content-center ">
          <div >
            <GameComponent
              v-on:requestToStand="finishPicking"
              v-bind:bidAmount="store.bidAmount"
              v-bind:walletMoney="store.walletMoney"
              v-bind:hit="store.hitController"
              v-bind:stand="store.standController"
              v-on:requestToPickCard="store.hit"
              v-bind:winner="store.winner"
              
            ></GameComponent>
          </div>
        </div>

        <div>
          <div col="12" class="d-flex gap-3 justify-content-center">
            <CardComponent
              v-for="card in store.cardsOfUser"
              :card="card.value.name"
              :symbol="card.symbol"
            />
          </div>
        </div>
        <div>
          <MDBCardTitle class="text-center">
            {{ store.playerName
            }}<span v-if="store.playerPoints">{{
              ": " + store.playerPoints + " points"
            }}</span>
          </MDBCardTitle>
        </div>
      </MDBCardBody>
    </MDBCard>
  </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
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
.vh-90{
  height: 90vh;
}
</style>
