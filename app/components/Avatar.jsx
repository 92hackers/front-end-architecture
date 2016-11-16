
import React from 'react';

const Avatar = (props) => {
  const { avatarUrl } = props

  return (
    <div className="t-avatar" style={{ width: '100%', height: '100%' }}>
      <img src={avatarUrl || '/images/teacher-avatar.png'} alt="teacher avatar" />
    </div>
  )
}

export default Avatar;
