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
.styled-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.styled-table th,
.styled-table td {
  padding: 1rem;
  text-align: left;
}

.styled-table thead tr {
  background-color: var(--blue-nav);
  color: white;
}

.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
  transition: background-color 0.2s;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f8f9fa;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #42b883;
}

.styled-table tbody tr:hover {
  background-color: #f1f1f1;
}

.status-badge {
  display: inline-block;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.in-stock {
  background-color: #c8e6c9;
  color: #2e7d32;
}

.low-stock {
  background-color: #fff3e0;
  color: #ef6c00;
}

.out-of-stock {
  background-color: #ffcdd2;
  color: #c62828;
}

.delete-btn {
  padding: 0.5rem 1rem;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.delete-btn:hover {
  background: #ff5252;
}

.low-stock {
  color: #ef6c00;
  font-weight: 600;
}

@media (max-width: 768px) {
  .styled-table {
    display: none;
  }

  .mobile-view {
    display: block;
  }

  .mobile-card {
    background: white;
    border-radius: 10px;
    padding: 1rem;
    margin-bottom: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .card-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
  }

  .card-row:last-child {
    border-bottom: none;
  }

  .card-label {
    font-weight: 600;
    color: #666;
    font-size: 0.9rem;
  }

  .card-value {
    text-align: right;
    color: #333;
  }

  .status-badge {
    display: inline-block;
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;
  }

  .delete-btn {
    width: 100%;
    padding: 0.6rem;
    font-size: 0.9rem;
  }
}

@media (min-width: 769px) {
  .mobile-view {
    display: none;
  }
}

.low-stock {
  color: #ef6c00 !important;
}

.status-badge {
  white-space: nowrap;
}

.delete-btn {
  transition: transform 0.2s;
}

.delete-btn:active {
  transform: scale(0.95);
}
</style>
