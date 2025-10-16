<template>
  <div>
    <MDBCard
      :style="{ width: '5rem' }"
      class="shadow-5 border border-secondary "
    >
      <div class="p-2">
        <div class="d-flex justify-content-between "><span class="text-danger">♥</span><span >♣</span></div>
        <div class="text-center fs-1"><strong><span class="text-danger">?</span><span>?</span></strong></div>
        <div class="text-end d-flex justify-content-between "><span>♠</span><span class="text-danger">♦</span></div>
      </div>
    </MDBCard>
  </div>
</template>

<script setup lang="ts">
import { MDBCard } from "mdb-vue-ui-kit";
</script>

<style scoped></style>
