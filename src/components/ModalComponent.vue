<template>
  <div>
    <MDBModal v-model="modalController">
      <MDBModalBody>
        <div>Available amount : ${{ walletMoney }}</div>
        <MDBInput
          v-model="bidAmount"
          type="number"
          label="Enter your bid"
        ></MDBInput>
        <div class="text-danger">{{bidError}}</div>
        <MDBBtn v-on:click="startGame">Start</MDBBtn>
      </MDBModalBody>
    </MDBModal>
  </div>
</template>

<script setup lang="ts">
import { MDBBtn, MDBInput, MDBModal, MDBModalBody } from "mdb-vue-ui-kit";
import { ref } from "vue";
const props=defineProps<{
  bidError: string;
}>();
const modalController = defineModel<boolean>();
const walletMoney = defineModel<number>("walletMoney");
const bidAmount = ref<number>(0)
const emits = defineEmits<{
  (e: "requestToStartGame",value:number): void;
}>();
const startGame = (): void => {
  emits("requestToStartGame",bidAmount.value);
  if(props.bidError){
  bidAmount.value=0;
  }
};
</script>

<style scoped></style>
