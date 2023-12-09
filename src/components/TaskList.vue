<script setup lang="ts">
import TaskElement from './TaskElement.vue';
import { Task } from './../data/task';
import { computed, ref } from 'vue';

interface TaskListProps {
    tasks: Task[],
    try_text?: string
}

const props = defineProps<TaskListProps>();
const filtro = ref('');

const emits = defineEmits<{
  (e: 'deleteelement', id: number): void
  (e: 'updateelement', id: number, text: string): void,
  (e: 'markfinished', id: number, marked: boolean): void
}>()

const filtered_elems = computed(() => filtro.value.trim() != '' ? props.tasks.filter(e => e.task.toLowerCase().includes(filtro.value.trim().toLowerCase())) : props.tasks)

</script>

<template>
    <div class="list-container">
        <input v-model="filtro" type="text" placeholder="Filtrar elementos...">
        <TaskElement @updateelement="(...args) => emits('updateelement', ...args)" @markfinished="(...args) => emits('markfinished', ...args)" @deleteelement="i => emits('deleteelement', i)" v-for="element in filtered_elems" :key="element.id" :id="element.id" :finished="element.finished" :task="element.task"></TaskElement>
        <span class="no-elements" v-if="props.tasks.length == 0">Parece ser que no hay nada aqui{{ try_text ? `, prueba ${try_text}` : '' }}</span>
    </div>
</template>

<style scoped>
.no-elements{
    color: #ddd;
    text-align: center;
}
.list-container{
    display: flex;
    flex-direction: column;
    gap: 1em;
}

</style>