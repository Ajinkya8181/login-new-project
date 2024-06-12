<template>
  <div>
    <h1>Tasks</h1>
    <form @submit.prevent="createTask">
      <input v-model="title" type="text" placeholder="Title" required />
      <input v-model="description" type="text" placeholder="Description" />
      <button type="submit">Add Task</button>
    </form>
    <ul>
      <li v-for="task in tasks" :key="task._id">
        <span>{{ task.title }}: {{ task.description }}</span>
        <button @click="editTask(task)">Edit</button>
        <button @click="deleteTask(task._id)">Delete</button>
      </li>
    </ul>
    <div v-if="editingTask">
      <h2>Edit Task</h2>
      <form @submit.prevent="updateTask">
        <input v-model="editingTask.title" type="text" required />
        <input v-model="editingTask.description" type="text" />
        <button type="submit">Update</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'TasksPage',
  data() {
    return {
      title: '',
      description: '',
      editingTask: null,
    };
  },
  computed: {
    ...mapState(['tasks']),
  },
  async created() {
    this.$store.dispatch('fetchTasks');
  },
  methods: {
    async createTask() {
      try {
        await this.$store.dispatch('createTask', { title: this.title, description: this.description });
        this.title = '';
        this.description = '';
      } catch (error) {
        console.error('Failed to create task:', error);
      }
    },
    editTask(task) {
      this.editingTask = { ...task };
    },
    async updateTask() {
      try {
        await this.$store.dispatch('updateTask', this.editingTask);
        this.editingTask = null;
      } catch (error) {
        console.error('Failed to update task:', error);
      }
    },
    async deleteTask(id) {
      try {
        await this.$store.dispatch('deleteTask', id);
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    },
  },
};
</script>
