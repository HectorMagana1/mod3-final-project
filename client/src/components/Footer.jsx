import React from 'react'
import {BiLogoGithub} from 'react-icons/bi'

export default function Footer() {
  return (
    <div className='bg-root-dark h-[60px] flex items-center justify-center'>
     <a href='https://github.com/HectorMagana1/mod3-final-project'><BiLogoGithub size='30' color='black' /></a>
     <a href='https://github.com/HectorMagana1/mod3-final-project'>Github</a>
    </div>
  )
}
