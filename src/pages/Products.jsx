import { useState, useMemo } from 'react'
import { useProducts } from '../context/ProductContext'
import ProductList from '../components/products/ProductList'
import ProductFilters from '../components/products/ProductFilters'
import ProductForm from '../components/products/ProductForm'
import Modal from '../components/ui/Modal'
import Button from '../components/ui/Button'
import { filterProducts, sortProducts, filterByPriceRange } from '../utils/helpers'

export default function Products() {
  const { products, categories, loading, addProduct } = useProducts()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('title-asc')
  const [category, setCategory] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredProducts = useMemo(() => {
    let result = products

    result = filterProducts(result, searchTerm)

    if (category !== 'all') {
      result = result.filter(p => p.category === category)
    }

    result = filterByPriceRange(result, priceRange)

    result = sortProducts(result, sortBy)

    return result
  }, [products, searchTerm, sortBy, category, priceRange])

  const handleAddProduct = (productData) => {
    addProduct(productData)
    setShowAddModal(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Products
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your product catalog
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          + Add Product
        </Button>
      </div>

      <ProductFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        onSortChange={setSortBy}
        category={category}
        onCategoryChange={setCategory}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        categories={categories}
      />

      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Showing {filteredProducts.length} of {products.length} products
      </div>

      <ProductList products={filteredProducts} loading={loading} />

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Product"
      >
        <ProductForm
          onSubmit={handleAddProduct}
          onCancel={() => setShowAddModal(false)}
          categories={categories}
        />
      </Modal>
    </div>
  )
}
