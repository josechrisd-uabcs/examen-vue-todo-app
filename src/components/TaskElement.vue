<script setup lang="ts">
import { Ref, computed, ref, watch } from 'vue';


interface TaskElementProps {
  id: number;
  task: string;
  finished: boolean;
}

const props = defineProps<TaskElementProps>()

const emits = defineEmits<{
  (e: 'deleteelement', id: number): void
  (e: 'updateelement', id: number, text: string): void
  (e: 'markfinished', id: number, marked: boolean): void
}>()

const input_id = computed(() => `check_${props.id}`)

const delete_element = () => emits('deleteelement', props.id);
const finished_check = ref(props.finished);
const editing = ref(false);

const input: Ref<HTMLInputElement|undefined> = ref(undefined)
const input_val = ref('')

watch(finished_check, () => {
  emits('markfinished', props.id, finished_check.value);
})

watch(editing, () => {
  input.value?.focus();
  console.log(input.value)
}, { flush: 'post' })

const saveTask = () => {
  if(input_val.value.trim() != ''){
    emits('updateelement', props.id, input_val.value);
    editing.value = false;
  }
}

</script>
<template>
  <div class="task-container">    
    <div class="checkbox-wrapper-43" v-if="!editing">
      <input v-model="finished_check" :id="input_id" type="checkbox">
      <label :for="input_id" class="check">
        <svg width="18px" height="18px" viewBox="0 0 18 18">
          <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
          <polyline points="1 9 7 14 15 4"></polyline>
        </svg>
      </label>
    </div>
    <span v-if="!editing">{{ props.task }}</span>
    <input ref="input" v-model="input_val" :style="{display: editing ? '' : 'none'}" type="text" >
    <div class="button-container" v-if="!editing" >
      <button v-if="!finished" class="edit-btn" @click="(editing = true) && (input_val = props.task)">Editar</button>
      <button class="delete-btn" @click="delete_element">Eliminar</button>
    </div>
    <div class="button-container" :style="{display: 'block', position: 'static'}" v-if="editing" >
      <button class="edit-btn" @click="editing = false">Cancelar</button>
      <button class="edit-btn" @click="saveTask">Guardar</button>
    </div>
  </div>
</template>
<style scoped>
.task-container {
  background-color: #fff;
  border-radius: 1em;
  position: relative;
  display: flex;
  align-items: center;
  gap: .5em;
  padding: 1em;
}

span{
  font-weight: bold;
}

.delete-btn, .edit-btn{
  font-size: .7em;
}

.button-container{
  display: none;
  top: 1em;
  right: 1em;
  position: absolute;
}

.task-container:hover .button-container{
  display: flex;
  gap: .5em;
}


.checkbox-wrapper-43{
  display: flex;
}

.checkbox-wrapper-43 input[type="checkbox"] {
    display: none;
    visibility: hidden;
  }

  .checkbox-wrapper-43 label {
    display: inline-block;
  }

  .checkbox-wrapper-43 .check {
    cursor: pointer;
    position: relative;
    margin: auto;
    width: 18px;
    height: 18px;
    -webkit-tap-highlight-color: transparent;
    transform: translate3d(0, 0, 0);
  }
  .checkbox-wrapper-43 .check:before {
    content: "";
    position: absolute;
    top: -15px;
    left: -15px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(34,50,84,0.03);
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  .checkbox-wrapper-43 .check svg {
    position: relative;
    z-index: 1;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke: #c8ccd4;
    stroke-width: 1.5;
    transform: translate3d(0, 0, 0);
    transition: all 0.2s ease;
  }
  .checkbox-wrapper-43 .check svg path {
    stroke-dasharray: 60;
    stroke-dashoffset: 0;
  }
  .checkbox-wrapper-43 .check svg polyline {
    stroke-dasharray: 22;
    stroke-dashoffset: 66;
  }
  .checkbox-wrapper-43 .check:hover:before {
    opacity: 1;
  }
  .checkbox-wrapper-43 .check:hover svg {
    stroke: #4285f4;
  }
  .checkbox-wrapper-43 input[type="checkbox"]:checked + .check svg {
    stroke: #4285f4;
  }
  .checkbox-wrapper-43 input[type="checkbox"]:checked + .check svg path {
    stroke-dashoffset: 60;
    transition: all 0.3s linear;
  }
  .checkbox-wrapper-43 input[type="checkbox"]:checked + .check svg polyline {
    stroke-dashoffset: 42;
    transition: all 0.2s linear;
    transition-delay: 0.15s;
  }
</style>
