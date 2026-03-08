const API_BASE = '/api'

export const api = {
  blogs: {
    getList: async (params?: { page?: number; limit?: number; category?: string }) => {
      const queryString = new URLSearchParams(params as Record<string, string>).toString()
      const response = await fetch(`${API_BASE}/blogs${queryString ? `?${queryString}` : ''}`)
      return response.json()
    },

    getById: async (id: number) => {
      const response = await fetch(`${API_BASE}/blogs/${id}`)
      return response.json()
    },

    create: async (data: { title: string; author?: string; excerpt?: string }) => {
      const response = await fetch(`${API_BASE}/blogs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      return response.json()
    },

    update: async (id: number, data: Partial<{ title: string; author: string; excerpt: string }>) => {
      const response = await fetch(`${API_BASE}/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      return response.json()
    },

    delete: async (id: number) => {
      const response = await fetch(`${API_BASE}/blogs/${id}`, {
        method: 'DELETE'
      })
      return response.json()
    }
  },

  files: {
    getList: async (params?: { page?: number; limit?: number; type?: string; sort?: string }) => {
      const queryString = new URLSearchParams(params as Record<string, string>).toString()
      const response = await fetch(`${API_BASE}/files${queryString ? `?${queryString}` : ''}`)
      return response.json()
    },

    getById: async (id: number) => {
      const response = await fetch(`${API_BASE}/files/${id}`)
      return response.json()
    },

    create: async (data: { title: string; author?: string; size?: string; excerpt?: string }) => {
      const response = await fetch(`${API_BASE}/files`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      return response.json()
    },

    update: async (id: number, data: Partial<{ title: string; author: string; size: string; excerpt: string }>) => {
      const response = await fetch(`${API_BASE}/files/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      return response.json()
    },

    delete: async (id: number) => {
      const response = await fetch(`${API_BASE}/files/${id}`, {
        method: 'DELETE'
      })
      return response.json()
    }
  }
}
