import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import { useCart } from '../context/CartContext'
import { fetchProductById } from '../services/api'
import { formatPrice } from '../utils/helpers'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import ProductForm from '../components/products/ProductForm'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, categories, updateProduct, deleteProduct } = useProducts()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    loadProduct()
  }, [id])

  const loadProduct = async () => {
    try {
      setLoading(true)
      
      const localProduct = products.find(p => p.id === parseInt(id))
      
      if (localProduct) {
        setProduct(localProduct)
      } else {
        const data = await fetchProductById(id)
        setProduct(data)
      }
    } catch (error) {
      console.error('Error loading product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = (updates) => {
    updateProduct(parseInt(id), updates)
    setProduct(prev => ({ ...prev, ...updates }))
    setShowEditModal(false)
  }

  const handleDelete = () => {
    deleteProduct(parseInt(id))
    navigate('/products')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Product not found
        </h2>
        <Link to="/products">
          <Button>Back to Products</Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <Link to="/products" className="hover:text-primary-600 dark:hover:text-primary-400">
          Products
        </Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-gray-100">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-8">
          <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center p-8">
            <img 
              src={product.image} 
              alt={product.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </Card>

        <div>
          <Card className="p-8">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium mb-4">
                {product.category}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {product.title}
            </h1>

            {product.rating && (
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i}
                      className={`w-5 h-5 ${i < Math.round(product.rating.rate) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>
            )}

            <div className="mb-6">
              <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                {formatPrice(product.price)}
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Description
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex gap-3 mb-6">
              <Button 
                onClick={() => addToCart(product)}
                className="flex-1"
              >
                Add to Cart
              </Button>
              <Button 
                onClick={() => setShowEditModal(true)}
                variant="outline"
              >
                Edit
              </Button>
              <Button 
                onClick={() => setShowDeleteModal(true)}
                variant="danger"
              >
                Delete
              </Button>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Category:</span>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {product.category}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Product ID:</span>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    #{product.id}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Product"
      >
        <ProductForm
          initialData={product}
          onSubmit={handleUpdate}
          onCancel={() => setShowEditModal(false)}
          categories={categories}
        />
      </Modal>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Product"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p className="text-gray-600 dark:text-gray-400">
          Are you sure you want to delete <strong>{product.title}</strong>? 
          This action cannot be undone.
        </p>
      </Modal>
    </div>
  )
}
