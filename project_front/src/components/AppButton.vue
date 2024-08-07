<template>
    <v-btn
        type="submit"
        :text="text"
        variant="text"
        class="rounded-xl b-1"
        density="comfortable"
        id=button
        :ripple="false"
        >
    </v-btn>
</template>
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  text: {
    type: String,
    default: '新增'
  }
});
</script>
