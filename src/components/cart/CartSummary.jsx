import { formatPrice } from '../../utils/helpers'
import Card from '../ui/Card'
import Button from '../ui/Button'

export default function CartSummary({ total, itemCount, onCheckout, onClearCart }) {
  const shipping = itemCount > 0 ? 10 : 0
  const tax = total * 0.1
  const grandTotal = total + shipping + tax

  return (
    <Card className="p-6 sticky top-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Order Summary
      </h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Subtotal ({itemCount} items)</span>
          <span>{formatPrice(total)}</span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Shipping</span>
          <span>{formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Tax (10%)</span>
          <span>{formatPrice(tax)}</span>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
          <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-gray-100">
            <span>Total</span>
            <span>{formatPrice(grandTotal)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Button 
          onClick={onCheckout} 
          className="w-full"
          disabled={itemCount === 0}
        >
          Proceed to Checkout
        </Button>
        <Button 
          onClick={onClearCart}
          variant="secondary"
          className="w-full"
          disabled={itemCount === 0}
        >
          Clear Cart
        </Button>
      </div>
    </Card>
  )
}
