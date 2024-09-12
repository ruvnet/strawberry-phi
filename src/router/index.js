import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import NewJob from '../views/NewJob.vue'
import JobStatus from '../views/JobStatus.vue'
import ModelTesting from '../views/ModelTesting.vue'
import Settings from '../views/Settings.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/new-job',
    name: 'NewJob',
    component: NewJob
  },
  {
    path: '/jobs',
    name: 'JobStatus',
    component: JobStatus
  },
  {
    path: '/test',
    name: 'ModelTesting',
    component: ModelTesting
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router