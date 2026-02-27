import Input from '../ui/Input'
import Select from '../ui/Select'
import { SORT_OPTIONS, PRICE_RANGES } from '../../utils/constants'

export default function ProductFilters({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  category,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  categories
}) {
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...categories.map(cat => ({ value: cat, label: cat.charAt(0).toUpperCase() + cat.slice(1) }))
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <Select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          options={categoryOptions}
        />

        <Select
          value={priceRange}
          onChange={(e) => onPriceRangeChange(e.target.value)}
          options={PRICE_RANGES}
        />

        <Select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          options={SORT_OPTIONS}
        />
      </div>
    </div>
  )
}
