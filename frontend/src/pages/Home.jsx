import React from 'react'
import HeroSection from '../components/HeroSection'

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <div className='p-6 text-center'>
        <h2 className='text-2xl font-bold mb-4'>How HabitLeaf Works</h2>
        <p className='text-gray-700 mb-4'>
          Join us in tracking your sustainable habits and making a positive impact on the planet.
        </p>
        <p className='text-gray-700'>
          Create an account, set your goals, and start building eco-friendly habits today!
        </p>
      </div>
    </div>
  )
}

export default Home
