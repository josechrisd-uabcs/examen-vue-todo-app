<script setup lang="ts">
import TaskElement from './TaskElement.vue';
import { Task } from './../data/task';

interface TaskListProps {
    tasks: Task[]
}

const props = defineProps<TaskListProps>();

const emits = defineEmits<{
  (e: 'deleteelement', id: number): void
  (e: 'updateelement', id: number, text: string): void,
  (e: 'markfinished', id: number, marked: boolean): void
}>()


</script>

<template>
    <div class="list-container">
        <TaskElement @updateelement="(...args) => emits('updateelement', ...args)" @markfinished="(...args) => emits('markfinished', ...args)" @deleteelement="i => emits('deleteelement', i)" v-for="element in props.tasks" :key="element.id" :id="element.id" :finished="element.finished" :task="element.task"></TaskElement>
    </div>
</template>

<style scoped>

.list-container{
    display: flex;
    flex-direction: column;
    gap: 1em;
}

</style>