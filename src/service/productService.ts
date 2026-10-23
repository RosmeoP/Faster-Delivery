import { apiRequest } from '../api/http'

export interface Category {
  id: number
  name: string
  description: string
}

export interface CreateProductPayload {
  name: string
  categoryId: number
  sku: string | null
  description: string
  regularPrice: number
  salePrice: number | null
  stock: number
  minStock: number
}

export interface CreatedProduct extends CreateProductPayload {
  id: number
  category: { id: number; name: string }
  createdAt: string
  updatedAt: string
}

export function getCategories(): Promise<Category[]> {
  return apiRequest<Category[]>('/api/categories')
}

export function createProduct(payload: CreateProductPayload): Promise<CreatedProduct> {
  return apiRequest<CreatedProduct>('/api/products', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
