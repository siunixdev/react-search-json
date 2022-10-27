import React from 'react'

const Header = ({title, description}) => {
  return (
    <>
      <div className='bg-violet-900 text-white text-center py-10 px-5 lg:px-52 lg:py-20 xl:px-96 xl:py-16 mb-4 md:mb-14'>
        <div className='container mx-auto '>
          <h1 className='text-5xl font-bold mb-7'>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
    </>
  )
}

export default Header