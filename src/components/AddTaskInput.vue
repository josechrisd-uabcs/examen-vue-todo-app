<script setup lang="ts">
import { ref } from 'vue';

const emits = defineEmits<{
  (e: 'add', text: string): void
}>()

const text = ref('')
const addtask = () => {
    if(text.value.trim() !== ''){
        emits('add', text.value);
        text.value = '';
    }
}

</script>

<template>
    <form class="add-task-container" @submit="e => { e.preventDefault(); addtask() }">
        <input type="text" v-model="text" placeholder="Ingrese la tarea a agregar..." />
        <button type="submit">Agregar</button>
    </form>
</template>

<style>
.add-task-container{
    display: flex;
    gap: .5em;
}
input{
    padding: 8px;
    font-weight: bold;
    box-sizing: border-box;
    display: block;
    border: none;
    border-bottom: 1px solid #ccc;
    border-radius: .5em;
    flex: 1;
}

</style>