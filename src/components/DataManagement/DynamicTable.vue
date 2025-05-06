<template>
  <div class="data-table">
    <table class="styled-table hidden-mobile">
      <thead>
        <tr>
          <th>SKU</th>
          <th>Item</th>
          <th>Category</th>
          <th>Stock</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.sku }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.category }}</td>
          <td :class="{ 'low-stock': item.stock < 10 }">
            {{ item.stock }}
          </td>
          <td>
            <span
              class="status-badge"
              :class="statusClass(item.status)"
            >
              {{ item.status }}
            </span>
          </td>
          <td>
            <button
              @click="$emit('delete-item', item.id)"
              class="delete-btn"
            >
              🗑️ Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="mobile-view">
      <div
        v-for="item in items"
        :key="item.id"
        class="mobile-card"
      >
        <div class="card-row">
          <span class="card-label">Item:</span>
          <span class="card-value">{{ item.name }}</span>
        </div>
        <div class="card-row">
          <span class="card-label">Stock:</span>
          <span
            :class="[
              'card-value',
              { 'low-stock': item.stock < 10 },
            ]"
          >
            {{ item.stock }}
          </span>
        </div>
        <div class="card-row">
          <span class="card-label">Status:</span>
          <span class="card-value">
            <span
              class="status-badge"
              :class="statusClass(item.status)"
            >
              {{ item.status }}
            </span>
          </span>
        </div>
        <div class="card-actions">
          <button
            @click="$emit('delete-item', item.id)"
            class="delete-btn"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Item {
  id: number;
  sku: string;
  name: string;
  category: string;
  stock: number;
  status: string;
}

defineProps<{
  items: Item[];
}>();

defineEmits<{
  (e: 'delete-item', id: number): void;
}>();

const statusClass = (status: string) => {
  return {
    'in-stock': status === 'In Stock',
    'low-stock': status === 'Low Stock',
    'out-of-stock': status === 'Out of Stock',
  };
};
</script>

<style scoped>
.data-table {
  margin-top: 2rem;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.styled-table th {
  background: var(--pewter);
  color: var(--dark-blue);
  font-weight: 500;
  padding: 1rem 1.5rem;
  text-align: left;
  border-bottom: 2px solid var(--blue-gray);
  font-size: 0.9rem;
}

.styled-table td {
  padding: 1rem 1.5rem;
  color: var(--dark-blue);
  border-bottom: 1px solid var(--pewter);
  font-size: 0.9rem;
}

.styled-table tbody tr:last-child td {
  border-bottom: none;
}

.styled-table tbody tr:hover {
  background: rgba(144, 173, 198, 0.03);
}

.status-badge {
  display: inline-block;
  padding: 0.35rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid;
  background: white;
}

.in-stock {
  color: var(--dark-blue);
  border-color: var(--yellow);
  background: rgba(250, 208, 44, 0.1);
}

.low-stock {
  color: var(--russian-violet);
  border-color: var(--blue-gray);
  background: rgba(144, 173, 198, 0.1);
}

.out-of-stock {
  color: var(--russian-violet);
  border-color: var(--russian-violet);
  background: rgba(52, 17, 63, 0.05);
}

.delete-btn {
  background: none;
  color: var(--russian-violet);
  padding: 0.4rem 0.8rem;
  border: 1px solid var(--pewter);
  border-radius: 6px;
  transition: all 0.2s ease;
  font-size: 0.8rem;
}

.delete-btn:hover {
  background: rgba(52, 17, 63, 0.03);
  border-color: var(--russian-violet);
}

.mobile-view {
  display: none;
}

@media (max-width: 768px) {
  .styled-table {
    display: none;
  }

  .mobile-view {
    display: grid;
    gap: 1rem;
  }

  .mobile-card {
    background: white;
    border: 1px solid var(--pewter);
    border-radius: 8px;
    padding: 1.2rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  }

  .card-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--pewter);
  }

  .card-row:last-child {
    border-bottom: none;
  }

  .card-label {
    color: #234664;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .card-value {
    color: var(--dark-blue);
    font-weight: 500;
    text-align: right;
  }

  .card-actions {
    margin-top: 0.5rem;
    padding-top: 0.5rem;
  }

  .low-stock {
    color: var(--russian-violet);
    font-weight: 600;
  }

  .mobile-card .delete-btn {
    width: 100%;
    padding: 0.6rem;
    font-size: 0.85rem;
  }
}

.low-stock-indicator {
  color: var(--russian-violet);
  font-weight: 600;
}
</style>
