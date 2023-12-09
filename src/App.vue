<script setup lang="ts">
import { Ref, computed, onMounted, ref } from 'vue';
import TaskList from './components/TaskList.vue';
import AddTaskInput from './components/AddTaskInput.vue';
import { Task } from './data/task';
import SwitchSelector from './components/SwitchSelector.vue';
import { loadData, saveData } from './utils/storage';

const tasks: Ref<Task[]> = ref([]);

const showCompletedTasks = ref(false)

const deleteElement = (id: number) => {
  tasks.value = tasks.value.filter(e => e.id != id);
  saveData<Task[]>('tasks', tasks.value);
}

const completed_tasks = computed(() => tasks.value.filter(e => e.finished))
const pending_tasks = computed(() => tasks.value.filter(e => !e.finished))

const mark_finished = (id: number, checked: boolean) => {
  const elem = tasks.value.find(e => e.id == id);
  elem && (elem.finished = checked);
  console.log(tasks.value)
  tasks.value = [ ...tasks.value ]
  saveData<Task[]>('tasks', tasks.value);
}

const addtask = (task: string) => {
  tasks.value.push({
    finished: false,
    id: (tasks.value.length > 0 ? Math.max(...tasks.value.map(e => e.id)) : 0) + 1,
    task
  });
  saveData<Task[]>('tasks', tasks.value);
}
const updateTask = (id: number, text: string) => {
  const elem = tasks.value.find(e => e.id == id);
  elem && (elem.task = text);
  console.log(tasks.value)
  tasks.value = [ ...tasks.value ]
  saveData<Task[]>('tasks', tasks.value);
}
onMounted(() => {
  tasks.value = loadData<Task[]>('tasks', []);
})

</script>

<template>
  <div class="container">
    <AddTaskInput @add="addtask"></AddTaskInput>
    <SwitchSelector @changeoption="i => showCompletedTasks = !!i" :selected_option="showCompletedTasks ? 1 : 0" :options="['Pendientes', 'Completadas']"></SwitchSelector>
    <TaskList @updateelement="updateTask" @markfinished="mark_finished" :tasks="showCompletedTasks ? completed_tasks : pending_tasks" @deleteelement="deleteElement"></TaskList>
  </div>
</template>

<style scoped>
  .container{
    max-width: 480px;
    margin: auto;
    padding-block: 1em;
    display: flex;
    flex-direction: column;
    gap: 1em
  }
</style>
