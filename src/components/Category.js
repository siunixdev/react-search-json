import React from 'react'

const Category = ({name, handleCategoriesChange}) => {
  return (
    <>
      <div className="flex items-center">
        <input id={name} type="checkbox" value={name} className="w-4 h-4" onChange={handleCategoriesChange} />
        <label htmlFor={name} className="ml-2 text-sm font-medium text-gray-800">{name}</label>
      </div>
    </>
  )
}

export default Category