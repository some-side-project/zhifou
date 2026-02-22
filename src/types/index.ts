export interface Blog {
  id: number
  title: string
  author: string
  date: string
  views: number
  excerpt?: string
}

export interface Tutorial {
  id: number
  title: string
  author: string
  lessons: number
  students: number
  excerpt: string
}

export interface File {
  id: number
  title: string
  author: string
  size: string
  downloads: number
  excerpt: string
}

export interface Service {
  id: number
  title: string
  provider: string
  price: string
  rating: number
  excerpt: string
}

export interface Blogger {
  id: number
  name: string
  avatar: string
  followers: number
  articles: number
  description: string
}

export interface Category {
  id: number
  name: string
  count: number
}