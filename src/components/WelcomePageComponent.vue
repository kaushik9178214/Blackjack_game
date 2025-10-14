<template>
  <div>
    <MDBCard class="border border-dark rounded-0">
      <MDBCardBody class="d-grid gap-3">
        <MDBInput
          v-model="playerName"
          type="text"
          label="Player name"
        ></MDBInput>
        <div class="text-danger">{{ nameError }}</div>
        <div class="text-center">
          <MDBBtn
            class="border border-danger text-danger rounded-0"
            v-on:click="redirectRequest"
            size="md"
            >Start game
          </MDBBtn>
        </div>
      </MDBCardBody>
    </MDBCard>
  </div>
</template>

<script setup lang="ts">
import { MDBBtn, MDBCard, MDBCardBody, MDBInput } from "mdb-vue-ui-kit";
const playerName = defineModel<string>();
defineProps<{
  nameError: string;
}>();
const emits = defineEmits<{
  (e: "requestToChangePage"): void;
}>();
const redirectRequest = (): void => {
  emits("requestToChangePage");
};
</script>

<style scoped></style>
