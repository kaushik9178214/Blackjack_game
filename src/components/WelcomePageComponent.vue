<template>
  <div>
    <MDBCard>
      <MDBCardBody>
        <MDBInput v-model="playerName" type="text" label="Player name"></MDBInput>
        <div class="text-danger">{{ nameError }}</div>
        <div class="text-center mt-3">
          <MDBBtn v-on:click="redirectRequest" size="sm" color="info">Start game </MDBBtn>
        </div>
        
      </MDBCardBody>
    </MDBCard>
  </div>
</template>

<script setup lang="ts">
import { MDBBtn, MDBCard, MDBCardBody, MDBInput } from "mdb-vue-ui-kit";
const playerName=defineModel<string>()
defineProps<{
  nameError:string
}>()
const emits=defineEmits<{
  (e:"requestToChangePage"):void
}>()
const redirectRequest=():void=>{
  emits("requestToChangePage")
}


</script>

<style scoped></style>
