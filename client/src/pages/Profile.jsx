import React from 'react'

export default function Profile() {
  const user={
    name:'Hector',
    username:'hector8423',
    email:'hm@gmail.com',
  }
  return (
    <div>
      <p>Profile</p>
      <div>
        <p>{user.name}</p>
        <button>Update</button>
      </div>
      <div>
        <p>{user.username}</p>
        <button>Update</button>
      </div>
      <div>
        <p>{user.email}</p>
        <button>Update</button>
      </div>
      <button>Delete</button>
    </div>
  )
}
