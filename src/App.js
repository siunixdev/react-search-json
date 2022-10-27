import { useState, useEffect } from 'react';
import { datas, categories } from './data'

function App() {
  const [company, setCompany] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState([])

  function truncate(str, count) {
    return str.split(" ").splice(0, count).join(" ");
  }

  function handleSearch() {
    const filtered = datas.filter(x => {
      const arr = x.title.toLowerCase().split(' ');
      return (arr.some(y => search.toLowerCase().includes(y)))
    });

    setCompany(filtered)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && search.length !== 0) handleSearch()
  }

  function handleChange(event) {
    setSearch(event.target.value);
    if (event.target.value === '') {
      setCompany(datas)
    }
  }

  function handleCategoriesChange(event) {
    const data = event.target.value
    const newCategory = new Set(category)
    if (!newCategory.has(data)) {
      newCategory.add(data)
    } else {
      newCategory.delete(data)
    }
    setCategory(Array.from(newCategory))
  }

  useEffect(() => {
    setCompany(datas)

    if (category.length !== 0) {
      const selectedCompany = []
      category.forEach(ct => {
        const index = datas.findIndex(data => data.category === ct)
        if (index !== -1) {
          selectedCompany.push(datas[index])
        }
      });

      setCompany(selectedCompany);
    }
  }, [category])

  return (
    <>
      <div className='bg-violet-900 text-white text-center py-10 px-5 lg:px-52 lg:py-20 xl:px-96 xl:py-16 mb-4 md:mb-14'>
        <div className='container mx-auto '>
          <h1 className='text-5xl font-bold mb-7'>Page title</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum rutrum, ipsum et lobortis pulvinar, velit libero hendrerit mauris, eget auctor lacus tellus at metus. Quisque tincidunt laoreet neque, nec congue eros sagittis at. Pellentesque non nunc a quam posuere ornare. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque et lacinia libero. In ut viverra turpis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus vestibulum congue erat sit amet tristique. </p>
        </div>
      </div>
      <div className='container mx-auto p-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-4 md:gap-8'>
          <div className='border border-gray-200 min-h-full rounded-md p-8'>
            <div className='mb-8'>
              <h3 className='text-lg font-bold text-gray-700 mb-4'>Filters</h3>
              <input type='text' value={search} className='border border-gray-200 w-full rounded-md p-2 outline-none mb-4' onChange={handleChange} onKeyDown={handleKeyDown} />
              <button className='bg-indigo-600 text-white w-auto px-4 py-2 rounded-md hover:bg-indigo-700' onClick={handleSearch}>Search</button>
            </div>
            <div>
              <h3 className='text-lg font-bold text-gray-700 mb-2'>Solution Type</h3>
              <hr />
              <div className='flex flex-col gap-3 mt-3'>
                {
                  categories.map((category, i) => (
                    <div className="flex items-center" key={i}>
                      <input id={category.name} type="checkbox" value={category.name} className="w-4 h-4" onChange={handleCategoriesChange} />
                      <label htmlFor={category.name} className="ml-2 text-sm font-medium text-gray-800">{category.name}</label>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          <div className='col-span-2 lg:col-span-3'>
            {
              company.length === 0 ? (
                <div>
                  <p className='text-center text-gray-500'>Sorry Can't find the data fro this category</p>
                </div>
              ) : (
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-8 md:gap-14'>
                  {
                    company.map((data, i) => (
                      <div className='flex items-end gap-5' key={i}>
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
                    ))
                  }
                </div>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
