<template>
  <div >
    <MDBCard :class="symbol=='♥'||symbol=='♦'?'border border-danger':'border border-dark'"  >
      <MDBCardBody class="d-flex-column"style="width: 6.2rem;height:9.9rem">
        
        <div :class="color" >{{ card }}</div>
        <div :class="color"  class="fs-1 text-center ">{{ symbol }}</div>
        <div :class="color" class="text-end" >{{ card }}</div>
      </MDBCardBody>
    </MDBCard>
  </div>
</template>

<script setup lang="ts">
import { MDBCard, MDBCardBody } from "mdb-vue-ui-kit";
import { computed } from "vue";

const props=defineProps<{
  card:string,
  symbol:string
}>()
const color=computed(()=>{
if(props.symbol=='♥'||props.symbol=='♦'){
  return 'text-danger'
}
else {
return 'text-dark'
}

})
</script>

<style scoped></style>
