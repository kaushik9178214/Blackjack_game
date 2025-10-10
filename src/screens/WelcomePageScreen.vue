<template>
  <MDBContainer class="border vh-100">
    <MDBRow>
      <div class="fs-4 text-center">Welcome to Premium Blackjack</div>
      <WelcomePageComponent
        class="d-flex justify-content-center align-items-center fixedHeight"
        v-model="store.playerName"
        :nameError="store.nameError"
        v-on:requestToChangePage="verifyAndProceed"
      />
    </MDBRow>
  </MDBContainer>
</template>

<script setup lang="ts">
import { MDBContainer, MDBRow } from "mdb-vue-ui-kit";
import WelcomePageComponent from "../components/WelcomePageComponent.vue";
import { useCardStore } from "../store/card-store";
import { router } from "../router/intex";
const store=useCardStore()
const verifyAndProceed=():void=>{
if(store.validatePlayer()){
  router.push('/GamePage')
}
}
</script>

<style scoped>
.fixedHeight{
height: 80vh;
}
</style>
