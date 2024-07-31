<template>
    <v-responsive >
        <v-text-field
        :label="label"
        variant="outlined"
        hide-details
        single-line
        density="comfortable"
        clearable
        dense
        >
        </v-text-field>
    </v-responsive>
</template>
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: '輸入文字'
  }
});
</script>