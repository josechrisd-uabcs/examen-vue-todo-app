<script setup lang="ts">
import {  ref } from 'vue';

const emits = defineEmits<{
  (e: 'changeoption', id: number): void
}>()

interface SwitchSelectorProps{
    options: string[],
    selected_option?: number
}

const props = defineProps<SwitchSelectorProps>()

const selected_option = ref(props.selected_option);
const changeOption = (i: number) => {
    selected_option.value = i;
    emits('changeoption', i)
}
</script>
<template>
    <div class="switch-container">
        <button @click="() => changeOption(i)" v-for="(option, i) of props.options" class="switch-option" :disabled="i == selected_option">{{ option }}</button>
    </div>
</template>
<style>
    .switch-container{
        border-radius: 1em;
        display: flex;
        gap: .5em;
    }

    .switch-container > *{
        flex: 1;
    }

    button:disabled{
        border: none;
        background-color: transparent;
    }
</style>