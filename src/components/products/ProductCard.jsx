import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { formatPrice, truncateText } from '../../utils/helpers'
import Card from '../ui/Card'
import Button from '../ui/Button'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <Link to={`/products/${product.id}`}>
        <div className="aspect-square bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-4">
          <img 
            src={product.image} 
            alt={product.title}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 hover:text-primary-600 dark:hover:text-primary-400">
            {truncateText(product.title, 50)}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {truncateText(product.description, 80)}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            {formatPrice(product.price)}
          </span>
          {product.rating && (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {product.rating.rate} ({product.rating.count})
              </span>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={() => addToCart(product)}
            className="flex-1"
            size="sm"
          >
            Add to Cart
          </Button>
          <Link to={`/products/${product.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}
