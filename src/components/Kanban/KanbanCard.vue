<template>
  <div class="kanban-card">
    <div class="card-header">
      <div class="card-title">
        {{ card.title }}
      </div>
      <button
        @click.stop="$emit('delete-card', card.id)"
        class="delete-card-btn"
      >
        &times;
      </button>
    </div>

    <div class="card-exercises">
      <div
        v-for="(exercise, index) in card.exercises"
        :key="index"
        class="exercise-item"
      >
        • {{ exercise }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  card: {
    id: number;
    title: string;
    exercises: string[];
  };
}>();

defineEmits(['delete-card']);
</script>

<style scoped>
.kanban-card {
  background: white;
  padding: 1rem;
  border-radius: 6px;
  cursor: move;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.kanban-card:hover {
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.delete-card-btn {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-size: 1.2em;
  padding: 0 0.3rem;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.delete-card-btn:hover {
  opacity: 1;
}

.card-title {
  font-weight: 600;
  color: #1e3a8a;
  font-size: 1.1em;
}

.card-exercises {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.exercise-item {
  font-size: 0.9em;
  color: #4b5563;
  padding-left: 0.5rem;
  line-height: 1.4;
}
</style>
