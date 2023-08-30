import React from 'react'

export default function LandingPage() {

  let url='https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d29ya2luZyUyMG91dHxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60'
  let relativePath = '../public/landingPage.jpg'

  return (
    // <div className='w-fit h-fit bg-no-repeat bg-cover bg-left' style={{backgroundImage: 'url(https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d29ya2luZyUyMG91dHxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60)'}}>
    <div>
      <div className='bg-cover h-[500px]' style={{backgroundImage: relativePath}}>
        {/* <div className='w-screen h-96 border-black border-2 fixed top-0 flex justify-center items-center'>Image or Video</div> */}
        {/* <div className='w-0 h-0 border'></div> */}
      </div>
      {/* <div className='flex flex-col items-end pr-[50px] pt-[50px]'>
        <p>text describing the website</p>
        <button className='p-[5px] hover:bg-yellow-300'>Sign up today!</button>
      </div> */}

      </div>
  )
}
