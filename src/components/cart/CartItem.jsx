import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../utils/helpers'

export default function CartItem({ item }) {
  const { addToCart, removeFromCart, deleteFromCart } = useCart()

  return (
    <div className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center p-2">
        <img 
          src={item.image} 
          alt={item.title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
          {item.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {item.category}
        </p>
        <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
          {formatPrice(item.price)}
        </p>
      </div>

      <div className="flex flex-col justify-between items-end">
        <button
          onClick={() => deleteFromCart(item.id)}
          className="text-gray-400 hover:text-red-500"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => removeFromCart(item.id)}
            className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center"
          >
            -
          </button>
          <span className="w-8 text-center font-semibold">
            {item.quantity}
          </span>
          <button
            onClick={() => addToCart(item)}
            className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center"
          >
            +
          </button>
        </div>

        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Subtotal: {formatPrice(item.price * item.quantity)}
        </p>
      </div>
    </div>
  )
}
