export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export const randomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const imageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

export const filterProducts = (products, searchTerm) => {
  if (!searchTerm) return products
  const term = searchTerm.toLowerCase()
  return products.filter(p => 
    p.title.toLowerCase().includes(term) || 
    p.description.toLowerCase().includes(term) ||
    p.category.toLowerCase().includes(term)
  )
}

export const sortProducts = (products, sortBy) => {
  const sorted = [...products]
  
  switch(sortBy) {
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    case 'title-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title))
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'rating-desc':
      return sorted.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
    default:
      return sorted
  }
}

export const filterByPriceRange = (products, range) => {
  if (range === 'all') return products
  
  const [min, max] = range.split('-').map(v => v.replace('+', ''))
  
  return products.filter(p => {
    if (max) {
      return p.price >= parseFloat(min) && p.price <= parseFloat(max)
    }
    return p.price >= parseFloat(min)
  })
}
