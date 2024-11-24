import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://你的Railway或Render后端地址/api'

console.log('API Base URL:', API_BASE_URL)

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  config => {
    console.log('Making request:', {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`
    })
    return config
  },
  error => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  response => {
    console.log('Response received:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    })
    return response
  },
  error => {
    console.error('API Error:', {
      message: error.message,
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      baseURL: error.config?.baseURL,
      fullURL: `${error.config?.baseURL}${error.config?.url}`
    })
    return Promise.reject(error)
  }
)

export interface WeightRecord {
  _id: string
  weight: number
  date: string
}

export interface UserSettings {
  initialWeight: number
  targetWeight: number
  height: number
}

export const metricsApi = {
  getAll: () => api.get<WeightRecord[]>('/metrics'),
  create: (data: { weight: string, date: string }) => api.post<WeightRecord>('/metrics', data)
}

export const settingsApi = {
  get: () => api.get<UserSettings>('/settings'),
  update: (data: UserSettings) => api.post<UserSettings>('/settings', data)
} 