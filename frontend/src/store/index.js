import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    user: null,
    tasks: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
  },
  actions: {
    async login({ commit }, { username, password }) {
      const response = await axios.post('http://localhost:3000/users/login', { username, password });
      const token = response.data;
      localStorage.setItem('token', token);
      commit('setUser', username);
    },
    async fetchTasks({ commit }) {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      commit('setTasks', response.data);
    },
    async createTask({ dispatch }, { title, description }) {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/tasks', { title, description }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch('fetchTasks');
    },
    async updateTask({ dispatch }, { id, title, description }) {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3000/tasks/${id}`, { title, description }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch('fetchTasks');
    },
    async deleteTask({ dispatch }, id) {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch('fetchTasks');
    },
    async register({ commit }, { username, password }) {
      await axios.post('http://localhost:3000/users/register', { username, password });
      commit('setUser', username);
    },
  },
  modules: {},
});
