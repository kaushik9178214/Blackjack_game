<template>
  <MDBContainer>
    <MDBRow>
      <h1 class="text-center">Welcome to Premium Blackjack</h1>
    </MDBRow>
    <MDBRow class="d-flex justify-content-center height align-items-center">
      <MDBCol col="5">
        <WelcomePageComponent
          v-model="store.playerName"
          :nameError="store.nameError"
          v-on:requestToChangePage="verifyAndProceed"
        />
      </MDBCol>
    </MDBRow>
  </MDBContainer>
</template>

<script setup lang="ts">
import { MDBCol, MDBContainer, MDBRow } from "mdb-vue-ui-kit";
import WelcomePageComponent from "../components/WelcomePageComponent.vue";
import { useCardStore } from "../store/card-store";
import { router } from "../router/intex";
const store = useCardStore();
const verifyAndProceed = (): void => {
  if (store.validatePlayer()) {
    router.push("/BetPage");
  }
};
</script>

<style scoped>
.height {
  height: 80vh;
}
</style>
