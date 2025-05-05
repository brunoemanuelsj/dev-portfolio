<template>
  <div class="kanban-panel">
    <draggable
      v-model="localColumns"
      group="columns"
      item-key="id"
      class="columns-container"
      @start="drag = true"
      @end="drag = false"
    >
      <template #item="{ element: column }">
        <div class="kanban-column">
          <div class="column-header">
            <h3>{{ column.title }}</h3>
          </div>

          <draggable
            v-model="column.cards"
            group="cards"
            item-key="id"
            class="cards-container"
            @start="drag = true"
            @end="drag = false"
          >
            <template #item="{ element: card }">
              <KanbanCard
                :card="card"
                @delete-card="deleteCard(column.id, $event)"
              />
            </template>
          </draggable>
          <button
            @click="addCard(column.id)"
            class="add-card-btn"
          >
            + Add Exercise Group
          </button>
        </div>
      </template>
    </draggable>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Create New Exercise Group</h3>

        <div class="form-group">
          <label>Group Title</label>
          <input
            v-model="newCardData.title"
            type="text"
            placeholder="Enter muscle group"
          />
        </div>

        <div class="form-group">
          <label>Exercises</label>
          <div
            v-for="(
              exercise, index
            ) in newCardData.exercises"
            :key="index"
            class="exercise-input"
          >
            <input
              v-model="newCardData.exercises[index]"
              type="text"
              :placeholder="`Exercise ${index + 1}`"
            />
            <button
              @click="removeExercise(index)"
              class="remove-btn"
            >
              &times;
            </button>
          </div>
          <button
            @click="addExercise"
            class="add-exercise-btn"
          >
            + Add Exercise
          </button>
        </div>

        <div class="modal-actions">
          <button @click="cancelCard" class="cancel-btn">
            Cancel
          </button>
          <button @click="confirmCard" class="confirm-btn">
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import draggable from 'vuedraggable';
import KanbanCard from './KanbanCard.vue';

interface ExerciseCard {
  id: number;
  title: string;
  exercises: string[];
}

export interface Column {
  id: number;
  title: string;
  cards: ExerciseCard[];
}

const drag = ref(false);

const showModal = ref(false);

const props = defineProps<{
  columns: Column[];
}>();

const localColumns = computed({
  get: () => props.columns,
  set: (value) => emit('update:columns', value),
});

const emit = defineEmits(['update:columns']);

const targetColumnId = ref<number | null>(null);
const newCardData = ref<Omit<ExerciseCard, 'id'>>({
  title: '',
  exercises: [''],
});

function addCard(columnId: number) {
  targetColumnId.value = columnId;
  newCardData.value = { title: '', exercises: [''] };
  showModal.value = true;
}

function addExercise() {
  newCardData.value.exercises.push('');
}

function removeExercise(index: number) {
  if (newCardData.value.exercises.length > 1) {
    newCardData.value.exercises.splice(index, 1);
  }
}

function confirmCard() {
  if (
    newCardData.value.title.trim() &&
    targetColumnId.value
  ) {
    const column = localColumns.value.find(
      (c) => c.id === targetColumnId.value
    );
    if (column) {
      column.cards.push({
        id: Date.now(),
        ...newCardData.value,
        exercises: newCardData.value.exercises.filter((e) =>
          e.trim()
        ),
      });
      showModal.value = false;
    }
  }
}

function deleteCard(columnId: number, cardId: number) {
  const column = localColumns.value.find(
    (c) => c.id === columnId
  );
  if (column) {
    column.cards = column.cards.filter(
      (card) => card.id !== cardId
    );
  }
}

function cancelCard() {
  showModal.value = false;
  newCardData.value = { title: '', exercises: [''] };
}
</script>

<style scoped>
.kanban-panel {
  padding: 1rem;
  overflow-x: auto;
}

.columns-container {
  display: flex;
  gap: 1rem;
  min-height: 400px;
}

.kanban-column {
  background: #f5f5f5;
  border-radius: 8px;
  min-width: 300px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.column-header {
  padding: 0.5rem;
  font-weight: bold;
  text-align: center;
  background: #3b82f6;
  color: white;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.cards-container {
  flex-grow: 1;
  min-height: 100px;
  border-radius: 4px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.add-card-btn {
  background: none;
  border: none;
  color: #666;
  padding: 0.5rem;
  cursor: pointer;
}

.add-card-btn:hover {
  color: #3b82f6;
}

.add-card-btn {
  margin-top: 0.5rem;
  padding: 0.75rem;
  width: 100%;
  transition: all 0.2s ease;
  border: 1px dashed #cbd5e1;
}

.add-card-btn:hover {
  background-color: #f8fafc;
  border-color: #3b82f6;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #1e3a8a;
}

input[type='text'] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.exercise-input {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.exercise-input input {
  flex: 1;
}

.remove-btn {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 0 0.5rem;
}

.add-exercise-btn {
  background: none;
  border: none;
  color: #3b82f6;
  cursor: pointer;
  padding: 0.5rem 0;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.cancel-btn,
.confirm-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn {
  background-color: #f8fafc;
  color: #64748b;
}

.cancel-btn:hover {
  background-color: #f1f5f9;
}

.confirm-btn {
  background-color: #3b82f6;
  color: white;
}

.confirm-btn:hover {
  background-color: #2563eb;
}
</style>
