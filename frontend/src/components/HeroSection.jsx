import React from 'react'
import forest from "../assets/herosection.jpg"

const HeroSection = () => {
  return (
    <div>
      <img src={forest} alt="forest" className='w-full h-180 object-cover rounded-lg shadow-md' />
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white'>
        <h1 className='text-4xl md:text-5xl font-bold mb-4'>Track Your Sustainable Habits</h1>    
        <p className='text-lg md:text-xl mb-6'>Join our community and make a positive impact on the planet</p>
        <button className='bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300'>
          Get Started
        </button>
      </div>
    </div>
  )
}

export default HeroSection
