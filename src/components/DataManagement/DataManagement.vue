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
}

.title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.form-container {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(200px, 1fr)
  );
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-input,
.form-select {
  padding: 0.8rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-input:focus,
.form-select:focus {
  border-color: #42b883;
  outline: none;
}

.add-button {
  width: 100%;
  padding: 1rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.2s,
    background 0.3s;
}

.add-button:hover {
  background: #358f6a;
  transform: translateY(-1px);
}

.add-button:disabled {
  background: #cccccc;
  cursor: not-allowed;
  transform: none;
}
</style>
