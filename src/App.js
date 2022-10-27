import { useState, useEffect } from 'react';
import Category from './components/Category';
import CompanyCard from './components/CompanyCard';
import Header from './components/Header';
import { datas, categories } from './data'

function App() {
  const [company, setCompany] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState([])

  function handleSearch() {
    if(search.trim() !== '') {
      const filtered = datas.filter(x => {
        const arr = x.title.toLowerCase().split(' ');
        return (arr.some(y => search.toLowerCase().includes(y)))
      });

      setCompany(filtered)
    }
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
      <Header title={"Company Solution Finder"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum rutrum, ipsum et lobortis pulvinar, velit libero hendrerit mauris, eget auctor lacus tellus at metus. Quisque tincidunt laoreet neque, nec congue eros sagittis at. Pellentesque non nunc a quam posuere ornare. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque et lacinia libero. In ut viverra turpis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus vestibulum congue erat sit amet tristique. "} />
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
                    <Category name={category.name} handleCategoriesChange={handleCategoriesChange} key={i} />
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
                      <CompanyCard data={data} categories={categories} key={i} />
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
