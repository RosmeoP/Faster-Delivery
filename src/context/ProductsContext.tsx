import { createContext, useContext, useState, type FC, type ReactNode } from 'react'
import type { Product } from '../models/product'
import { products as initialProducts } from '../data/products'
import type { CreatedProduct } from '../service/productService'

interface ProductsContextValue {
  products: Product[]
  addProduct: (created: CreatedProduct) => void
}

const ProductsContext = createContext<ProductsContextValue | null>(null)

export const ProductsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts)

  const addProduct: ProductsContextValue['addProduct'] = (created) => {
    const newProduct: Product = {
      id: created.id,
      name: created.name,
      category: created.category.name,
      description: created.description,
      price: created.salePrice ?? created.regularPrice,
    }

    setProducts((prev) => [newProduct, ...prev])
  }

  return (
    <ProductsContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProducts() {
  const ctx = useContext(ProductsContext)
  if (!ctx) throw new Error('useProducts debe usarse dentro de ProductsProvider')
  return ctx
}
