<template>
    <div>

<div>Current Bid: {{ bidAmount }}</div>
<MDBBtn :disabled="buttonToggle" v-on:click="makeBet">Bet</MDBBtn>
<MDBBtn :disabled="hit">Hit</MDBBtn>
<MDBBtn v-on:click="standClicked" :disabled="stand">Stand</MDBBtn>
<div>{{ playerName }}</div>
    </div>
</template>

<script setup lang="ts">
import { MDBBtn } from 'mdb-vue-ui-kit';


defineProps<{
bidAmount:number,
playerName:string
buttonToggle:boolean
hit:boolean
stand:boolean

}>()
const emits=defineEmits<{
    (e:"requestToMakeBet"):void
    (e:"requestToStand"):void
}>()
const makeBet=():void=>{
    emits("requestToMakeBet")
}
const standClicked=():void=>{
emits("requestToStand")
}
</script>

<style scoped>

</style>