import { createContext, useContext, useState, type FC, type ReactNode } from 'react'
import type { Product } from '../models/product'
import { products as initialProducts } from '../data/products'

interface ProductsContextValue {
  products: Product[]
  addProduct: (draft: {
    name: string
    category: string
    description: string
    regularPrice: string
    salePrice: string
    barcode: string
    initialStock: string
    minStock: string
  }) => void
}

const ProductsContext = createContext<ProductsContextValue | null>(null)

export const ProductsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts)

  const addProduct: ProductsContextValue['addProduct'] = (draft) => {
    const newProduct: Product = {
      id: Date.now(),
      name: draft.name,
      category: draft.category,
      description: draft.description,
      price: Number(draft.regularPrice) || 0,
    }

    setProducts((prev) => [newProduct, ...prev])
  }

  return (
    <ProductsContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const ctx = useContext(ProductsContext)
  if (!ctx) throw new Error('useProducts debe usarse dentro de ProductsProvider')
  return ctx
}
