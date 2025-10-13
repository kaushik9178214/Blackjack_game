<template>
  <div>
    
    <MDBModal v-model="toggleBoolean"  >
      <MDBModalBody>
        <div>{{ winner }}</div>
        <MDBBtn v-on:click="newRound">Play Again</MDBBtn>
        <MDBBtn v-on:click="exit">Exit</MDBBtn>
      </MDBModalBody>
    </MDBModal>
    <MDBModal   v-model="modalController">
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
import {  ref, watch } from "vue";
const props=defineProps<{
  bidError: string;
  winner:string
}>();

const toggleBoolean=ref<boolean>(false)
watch(()=>props.winner,()=>{
if(!props.winner){
  toggleBoolean.value=false
}
else{
  toggleBoolean.value=true
  bidAmount.value=0
}
})



const modalController = defineModel<boolean>();
const walletMoney = defineModel<number>("walletMoney");
const bidAmount = ref<number>(0)
const emits = defineEmits<{
  (e: "requestToStartGame",value:number): void;
  (e:"makeBid"):void
  (e:"exit"):void
}>();

const startGame = (): void => {
  emits("requestToStartGame",bidAmount.value);
  
};
const newRound=():void=>{
emits("makeBid")
}
const exit=()=>{
emits("exit")
}
</script>

<style scoped></style>
