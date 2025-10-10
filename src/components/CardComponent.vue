<template>
  <div class="d-flex">
    <MDBCard>
      <MDBCardBody>
        <div>{{ card }}</div>
      </MDBCardBody>
    </MDBCard>
  </div>
</template>

<script setup lang="ts">
import { MDBCard, MDBCardBody } from "mdb-vue-ui-kit";
defineProps<{
  card:string
}>()
</script>

<style scoped></style>
