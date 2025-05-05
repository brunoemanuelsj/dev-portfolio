<template>
  <div class="kanban_wrapper">
    <div class="actions_wrapper">
      <button @click="openColumnModal" class="add_btn">
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path
            fill="currentColor"
            d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"
          />
        </svg>
        Add Column
      </button>
    </div>

    <KanbanPanel v-model:columns="columns" />

    <div v-if="showColumnModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Create New Column</h3>

        <div class="form-group">
          <label>Column Name</label>
          <input
            v-model="newColumnName"
            type="text"
            placeholder="Enter column name"
            @keyup.enter="confirmColumn"
          />
        </div>

        <div class="modal-actions">
          <button @click="cancelColumn" class="cancel-btn">
            Cancel
          </button>
          <button
            @click="confirmColumn"
            class="confirm-btn"
            :disabled="!newColumnName.trim()"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Column } from '@/components/Kanban/KanbanPanel.vue';
import KanbanPanel from '@/components/Kanban/KanbanPanel.vue';
import { ref } from 'vue';

const columns = ref<Column[]>([
  {
    id: 1,
    title: 'Monday',
    cards: [
      {
        id: 1,
        title: 'Quadriceps',
        exercises: [
          'Leg extension 4x',
          'Barbell back squat 4x',
          'Leg press 4x',
        ],
      },
      {
        id: 2,
        title: 'Glutes',
        exercises: ['Hip thrust 4x'],
      },
      {
        id: 3,
        title: 'Calves',
        exercises: [
          'Standing calf raise 4x',
          'Seated calf raise 4x',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Tuesday',
    cards: [
      {
        id: 4,
        title: 'Chest',
        exercises: [
          'Incline bench press (30°) 4x',
          'Flat bench press 4x',
          'Machine chest fly 4x',
          'Push-up with stretch 3x',
        ],
      },
      {
        id: 5,
        title: 'Triceps',
        exercises: [
          'Triceps pushdown (bar) 4x',
          'Overhead rope triceps extension 4x',
          'Skull crusher (French press) 4x',
        ],
      },
      {
        id: 6,
        title: 'Forearms',
        exercises: ['Cable wrist curl 4x'],
      },
    ],
  },
  {
    id: 3,
    title: 'Wednesday',
    cards: [
      {
        id: 7,
        title: 'Core',
        exercises: ['Plank 4x'],
      },
    ],
  },
  {
    id: 4,
    title: 'Thursday',
    cards: [
      {
        id: 8,
        title: 'Hamstrings',
        exercises: [
          'Seated leg curl 4x',
          'Lying leg curl 4x',
          'Standing leg curl 4x',
        ],
      },
      {
        id: 9,
        title: 'Glutes',
        exercises: ['Hip abductor machine 4x'],
      },
      {
        id: 10,
        title: 'Shoulders',
        exercises: [
          'Front dumbbell raise 3x',
          'Lateral dumbbell raise 3x',
          'Face pull 3x',
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Friday',
    cards: [
      {
        id: 11,
        title: 'Back',
        exercises: [
          'Assisted pull-up (warm-up) 4x',
          'Single-arm dumbbell row 4x',
          'Machine T-bar row 4x',
          'Barbell shrug 2x',
        ],
      },
      {
        id: 12,
        title: 'Biceps',
        exercises: [
          'Dumbbell bicep curl 4x',
          'Preacher curl machine 4x',
          'Incline dumbbell curl 4x',
        ],
      },
      {
        id: 13,
        title: 'Forearms',
        exercises: ['Reverse cable wrist curl 4x'],
      },
    ],
  },
]);

const showColumnModal = ref(false);
const newColumnName = ref('');

function openColumnModal() {
  showColumnModal.value = true;
  newColumnName.value = '';
}

function confirmColumn() {
  if (newColumnName.value.trim()) {
    columns.value.push({
      id: Date.now(),
      title: newColumnName.value.trim(),
      cards: [],
    });
    showColumnModal.value = false;
  }
}

function cancelColumn() {
  showColumnModal.value = false;
  newColumnName.value = '';
}
</script>

<style scoped>
.kanban_wrapper {
  padding: 20px;
}

.actions_wrapper {
  display: flex;
  gap: 16px;
}

.add_btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px 8px 12px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;

  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.add_btn:hover {
  background-color: #2563eb;
}

.add_btn svg {
  flex-shrink: 0;
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
  max-width: 400px;
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

.confirm-btn:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}

.confirm-btn:hover:not(:disabled) {
  background-color: #2563eb;
}
</style>
