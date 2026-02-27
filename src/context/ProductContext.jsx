import { createContext, useContext, useState, useEffect } from 'react'
import { fetchProducts, fetchCategories } from '../services/api'

const ProductContext = createContext()

export const useProducts = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider')
  }
  return context
}

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [productsData, categoriesData] = await Promise.all([
        fetchProducts(),
        fetchCategories()
      ])
      
      const customProducts = JSON.parse(localStorage.getItem('customProducts') || '[]')
      setProducts([...productsData, ...customProducts])
      setCategories(categoriesData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
      rating: { rate: 0, count: 0 }
    }
    
    const customProducts = JSON.parse(localStorage.getItem('customProducts') || '[]')
    customProducts.push(newProduct)
    localStorage.setItem('customProducts', JSON.stringify(customProducts))
    
    setProducts(prev => [...prev, newProduct])
    return newProduct
  }

  const updateProduct = (id, updates) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
    
    const customProducts = JSON.parse(localStorage.getItem('customProducts') || '[]')
    const updatedCustom = customProducts.map(p => p.id === id ? { ...p, ...updates } : p)
    localStorage.setItem('customProducts', JSON.stringify(updatedCustom))
  }

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id))
    
    const customProducts = JSON.parse(localStorage.getItem('customProducts') || '[]')
    const filtered = customProducts.filter(p => p.id !== id)
    localStorage.setItem('customProducts', JSON.stringify(filtered))
  }

  return (
    <ProductContext.Provider value={{
      products,
      categories,
      loading,
      error,
      addProduct,
      updateProduct,
      deleteProduct,
      refreshProducts: loadData
    }}>
      {children}
    </ProductContext.Provider>
  )
}
