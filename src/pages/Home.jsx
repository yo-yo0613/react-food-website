import React from 'react'
import Hero from '../components/Hero/Hero'
import HotDessert from '../components/HotDessert/HotDessert'
import Banner from '../components/Banner/Banner'
import PopularRecipe from '../components/PopularRecipe/PopularRecipe'
import Testimonial from '../components/Testimonial/Testimonial'


export default function Home() {
  return (
    <>
      <Hero />
      <HotDessert />
      <Banner />
      <PopularRecipe /> 
      <Testimonial />
    </>
  )
}
