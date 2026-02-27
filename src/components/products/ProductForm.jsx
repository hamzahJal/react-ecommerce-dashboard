import { useState } from 'react'
import Input from '../ui/Input'
import Select from '../ui/Select'
import Button from '../ui/Button'
import { imageToBase64 } from '../../utils/helpers'

export default function ProductForm({ onSubmit, onCancel, initialData = null, categories }) {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    price: '',
    description: '',
    category: categories[0] || '',
    image: ''
  })
  const [imagePreview, setImagePreview] = useState(initialData?.image || '')
  const [loading, setLoading] = useState(false)

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (file) {
      try {
        const base64 = await imageToBase64(file)
        setFormData(prev => ({ ...prev, image: base64 }))
        setImagePreview(base64)
      } catch (error) {
        console.error('Error uploading image:', error)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 500))
    
    onSubmit({
      ...formData,
      price: parseFloat(formData.price)
    })
    
    setLoading(false)
  }

  const categoryOptions = categories.map(cat => ({
    value: cat,
    label: cat.charAt(0).toUpperCase() + cat.slice(1)
  }))

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Product Name"
        value={formData.title}
        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
        required
      />

      <Input
        label="Price"
        type="number"
        step="0.01"
        min="0"
        value={formData.price}
        onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
        required
      />

      <Select
        label="Category"
        value={formData.category}
        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
        options={categoryOptions}
      />

      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Description
        </label>
        <textarea
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
            bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          rows="4"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Product Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
            bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
            file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
            file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700
            hover:file:bg-primary-100"
        />
        {imagePreview && (
          <div className="mt-4 flex justify-center">
            <img src={imagePreview} alt="Preview" className="max-h-48 rounded-lg" />
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : initialData ? 'Update Product' : 'Add Product'}
        </Button>
      </div>
    </form>
  )
}
