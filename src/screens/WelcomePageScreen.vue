<template>
  <MDBContainer class="border vh-100">
    <MDBRow>
    <WelcomePageComponent  />
    </MDBRow>
  </MDBContainer>
</template>

<script setup lang="ts">
import { MDBContainer, MDBRow } from "mdb-vue-ui-kit";
import WelcomePageComponent from "../components/WelcomePageComponent.vue";
</script>

<style scoped></style>
