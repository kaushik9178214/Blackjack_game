<template>
  <div>
    <MDBModal v-model="modalController  " staticBackdrop
  >
      <MDBModalBody>
        <h2  class="text-center">{{ winner }}</h2>
        <MDBModalFooter>
        <MDBBtn class="border border-dark rounded-0" v-on:click="newRound">Play Again</MDBBtn>
        <MDBBtn class="border border-dark rounded-0" v-on:click="exit">Exit</MDBBtn>
        </MDBModalFooter>
      </MDBModalBody>
    </MDBModal>
  </div>
</template>

<script setup lang="ts">
import { MDBBtn, MDBModal, MDBModalBody, MDBModalFooter } from "mdb-vue-ui-kit";
defineProps<{
  winner: string;
}>();
const modalController = defineModel<boolean>();


const emits = defineEmits<{
  
  (e: "makeBid"): void;
  (e: "exit"): void;
}>();

const newRound = (): void => {
  emits("makeBid");
};
const exit = () => {
  emits("exit");
};
</script>

<style scoped></style>
