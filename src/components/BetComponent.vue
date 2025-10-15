<template>
  <MDBCard 
    ><MDBCardBody class="d-grid gap-3 border border-dark">
      <div class="fs-4 text-center">
        <strong>Available amount :</strong> ${{ walletMoney }}
      </div>
      <MDBInput
        v-model="bidAmount"
        type="number"
        label="Enter your bid"
        class="text-dark border border-light"
      ></MDBInput>
      <div class="text-danger">{{ bidError }}</div>
      <div class="text-center">
        <MDBBtn class="border border-danger text-danger rounded-0" v-on:click="startGame"
          >Start</MDBBtn
        >
      </div>
    </MDBCardBody></MDBCard
  >
</template>

<script setup lang="ts">
import { MDBBtn, MDBCard, MDBCardBody, MDBInput } from "mdb-vue-ui-kit";
import { ref } from "vue";
defineProps<{
  bidError: string;
}>();
const emits = defineEmits<{
  (e: "requestToStartGame", value: number): void;
}>();
const walletMoney = defineModel<number>("walletMoney");
const bidAmount = ref<number>(1);
const startGame = (): void => {
  emits("requestToStartGame", bidAmount.value);
};
</script>

<style scoped></style>
