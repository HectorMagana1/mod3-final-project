import React from 'react'

export default function Navbar() {

    let signedIn = true;

  return (
    <>
        <div>
            <p>home</p>
            {signedIn? <p>profile</p> : <p>log in</p>}
            <p>contact</p>
        </div>
    </>
  )
}
