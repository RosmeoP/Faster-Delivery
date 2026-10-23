import { ShoppingCart, Heart } from 'lucide-react'
import type { Product } from '../models/product'

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-32 w-full object-cover"
        />
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-bold text-slate-800">{product.name}</h3>
          <span className="whitespace-nowrap text-xs font-bold">${product.price.toFixed(2)}</span>
        </div>
        <p className="mt-2 h-10 overflow-hidden text-xs">{product.description}</p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded bg-indigo-600 px-3 py-2 text-xs font-medium text-white"
          >
            <ShoppingCart size={14} />
            Add to cart
          </button>
          <button 
            type="button"
            className="rounded border border-slate-200 px-3 py-2 text-slate-500 hover:bg-slate-100">
        
            <Heart size={14} />
          </button>
        </div>
      </div>
    </article>
  )
}
