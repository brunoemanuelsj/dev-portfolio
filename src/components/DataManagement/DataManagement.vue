<template>
  <div class="data-management">
    <h1 class="title">Inventory Management</h1>

    <div class="form-container">
      <div class="form-grid">
        <div class="form-group">
          <label>Item:</label>
          <input
            v-model="newItem.name"
            type="text"
            placeholder="Product name"
            class="form-input"
            required
          />
        </div>

        <div class="form-group">
          <label>Category:</label>
          <select
            v-model="newItem.category"
            class="form-select"
          >
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Food">Food</option>
            <option value="Books">Books</option>
          </select>
        </div>

        <div class="form-group">
          <label>Stock:</label>
          <input
            v-model.number="newItem.stock"
            type="number"
            min="1"
            class="form-input"
            required
          />
        </div>

        <div class="form-group">
          <label>Status:</label>
          <select
            v-model="newItem.status"
            class="form-select"
          >
            <option value="In Stock">Available</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">
              Out of Stock
            </option>
          </select>
        </div>
      </div>

      <button
        @click="addItem"
        class="add-button"
        :disabled="!formValid"
      >
        ➕ Add Item
      </button>
    </div>

    <DynamicTable
      :items="items"
      @delete-item="deleteItem"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import DynamicTable from './DynamicTable.vue';

interface Item {
  id: number;
  sku: string;
  name: string;
  category: string;
  stock: number;
  status: string;
}

const generateMockData = () => {
  const categories = [
    'Electronics',
    'Clothing',
    'Food',
    'Books',
  ];
  const statuses = [
    'In Stock',
    'Low Stock',
    'Out of Stock',
  ];

  return Array.from({ length: 5 }, (_, i) => ({
    id: Date.now() + i,
    sku: `SKU-${1000 + i}`,
    name: `Product ${i + 1}`,
    category: categories[i % 4],
    stock: Math.floor(Math.random() * 100),
    status: statuses[i % 3],
  }));
};

const items = ref<Item[]>(generateMockData());
const newItem = reactive({
  name: '',
  category: 'Electronics',
  stock: 0,
  status: 'In Stock',
});

const formValid = computed(() => {
  return newItem.name.trim() && newItem.stock > 0;
});

const addItem = () => {
  if (formValid.value) {
    items.value.push({
      id: Date.now(),
      sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      ...newItem,
    });

    newItem.name = '';
    newItem.stock = 0;
    newItem.status = 'In Stock';
  }
};

const deleteItem = (id: number) => {
  if (
    confirm('Are you sure you want to delete this item?')
  ) {
    items.value = items.value.filter(
      (item) => item.id !== id
    );
  }
};
</script>

<style scoped>
.data-management {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
}

.title {
  text-align: center;
  color: var(--russian-violet);
  margin-bottom: 2rem;
  font-size: 2.2rem;
  font-weight: 500;
  letter-spacing: -0.5px;
}

.form-container {
  background: var(--pewter);
  padding: 2rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(240px, 1fr)
  );
  gap: 1.2rem;
  margin-bottom: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: var(--dark-blue);
  font-size: 0.9rem;
  font-weight: 500;
}

.form-input,
.form-select {
  padding: 0.8rem 1rem;
  border: 1px solid var(--blue-gray);
  border-radius: 8px;
  background: white;
  color: var(--dark-blue);
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.form-input:focus,
.form-select:focus {
  border-color: var(--yellow);
  box-shadow: 0 0 0 3px rgba(250, 208, 44, 0.15);
  outline: none;
}

.add-button {
  width: 100%;
  padding: 1rem;
  background: var(--yellow);
  color: var(--dark-blue);
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.95rem;
}

.add-button:hover {
  background: #f5c400;
  transform: translateY(-1px);
}

.add-button:disabled {
  background: var(--pewter);
  color: var(--blue-gray);
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .data-management {
    padding: 1.5rem;
  }

  .form-container {
    padding: 1.5rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
