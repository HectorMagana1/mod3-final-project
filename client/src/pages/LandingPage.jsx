import React from 'react'
import Footer from '../components/Footer'

export default function LandingPage() {

  // let url='https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d29ya2luZyUyMG91dHxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60'
  // let relativePath = '../public/landingPage.jpg'

  return (
    <div>
        <div className='w-screen h-screen'>
          <img className='relative h-96 left-1/4' src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="" />
          <div className='w-0 h-0 border'></div>
        </div>
        <div className='flex flex-col items-end pr-[50px] pt-[50px]'>
          <p>text describing the website</p>
        </div>
      <Footer />
    </div>
  )
}
