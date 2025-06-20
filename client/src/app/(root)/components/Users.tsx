import React from 'react'
import CreateHobby from './CreateHobby'
import PostHobbyModal from './PostHobbyModal'

const Users = () => {
  return (
    <div className='border-2 w-[40%] min-h-screen'>
      <CreateHobby/>
      <PostHobbyModal/>
    </div>
  )
}

export default Users
