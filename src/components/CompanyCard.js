import React from 'react'

const CompanyCard = ({ data, categories }) => {
  function truncate(str, count) {
    return str.split(" ").splice(0, count).join(" ");
  }

  return (
    <>
      <div className='flex items-end gap-5'>
        <div className='relative flex items-center justify-center border border-gray-200 rounded-md w-52 h-52 p-4'>
          <img src={data.logo} alt="" />
          <div className='absolute flex items-center justify-center text-center bg-blue-400 rounded-md text-xs text-white w-24 h-10 p-4 -bottom-5'
            style={{ backgroundColor: categories[categories.findIndex(ct => ct.name === data.category)].color }}
          >
            {data.category}
          </div>
        </div>
        <div className='bottom-0 w-96'>
          <h2 className='2xl font-bold mb-1'>{data.title}</h2>
          <p>{truncate(data.dascription, 15)}</p>
          <button className='mt-6 font-medium text-indigo-600 hover:text-indigo-700'>More info</button>
        </div>
      </div>
    </>
  )
}

export default CompanyCard