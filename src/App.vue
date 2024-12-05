<script lang="ts">
import {toast} from "vue3-toastify";

export default {
  data() {
    return {
      items: <ToDo[]>[],
      newItem: '',
      hiddenCompleted: false
    }
  },
  methods: {
    addItem() {
      if(localStorage.getItem('items') !== null) {
        this.items = JSON.parse(localStorage.getItem('items') ?? '[]');
      } else {
        localStorage.setItem('items', JSON.stringify(this.items));
      }

      (this.items as ToDo[]).push({
        id: this.items.length + 1,
        text: this.newItem,
        done: false
      });
      localStorage.setItem('items', JSON.stringify(this.items));
      this.newItem = '';
      toast('Task added', {
        type: 'success'
      })
    },
    check(id: number) {
      this.items.filter((item) => item.id === id)[0].done = !this.items.filter((item) => item.id === id)[0].done;
      localStorage.setItem('items', JSON.stringify(this.items));
      if(this.items.filter((item) => item.id === id)[0].done) {
        toast('Task completed', {
          type: 'success'
        });
      } else {
        toast('Task not completed', {
          type: 'warning'
        });
      }
    },
    remove(id: number) {
      this.items = this.items.filter((item) => item.id !== id);
      localStorage.setItem('items', JSON.stringify(this.items));
      toast('Task removed', {
        type: 'success'
      });
    },
  },
  mounted() {
    if(localStorage.getItem('items') !== null) {
      this.items = JSON.parse(localStorage.getItem('items') ?? '[]');
    }
  },
  watch: {
    hiddenCompleted() {
      this.items = this.items.filter((item) => !item.done);
      if(!this.hiddenCompleted) {
        this.items = JSON.parse(localStorage.getItem('items') ?? '[]');
      }
    }
  },
}

interface ToDo {
  id: number;
  text: string;
  done: boolean;
}
</script>

<template>
  <main class="container py-5">
    <form @submit.prevent="addItem" class="row">
      <div class="col-3 mb-3">
        <input type="text" v-model="newItem" class="form-control"/>
      </div>
      <div class="col-2">
        <input type="submit" class="btn btn-primary"/>
      </div>
      <div class="form-check">
        <input type="checkbox" id="hide" v-model="hiddenCompleted" class="form-check-input"/>
        <label for="hide" class="form-check-label">
          Hide completed
        </label>
      </div>
    </form>
    <ul class="list-group mt-3 row">
      <li v-for="item in items" :key="item.id"
          class="list-group-item d-flex justify-content-between gap-3 align-items-center col-5">
        <input type="checkbox" :checked="item.done" @change="check(item.id)" class="form-check-input"/>
        <span>
          {{ item.text }}
        </span>
        <button @click="remove(item.id)" class="btn btn-danger">
          <i class="bi bi-trash3-fill"></i>
        </button>
      </li>
    </ul>
  </main>
</template>

<style scoped>
</style>
