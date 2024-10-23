import React from 'react'
import BannerImage from '../../components/Banner'
import ProductCard from '../../components/ProductCard'

function HomePage() {

    let array=[1,2,4,4]

  return (

    <div>
        <BannerImage/>
       <>
       <h1 className='text-4xl mt-3'>Major Proudcts</h1>
       <div className='w-full h-auto mx-auto bg-white mt-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
            {array.map(()=>
              <>
                <ProductCard/>
              </>  
            )}
        </div>
       </> 
    </div>

  )
}

export default HomePage
