import React from 'react'

type BadgeProps = {
    text: string | null;
  };

const Badge =({text}: BadgeProps) => {
  return (
    <div className='badge badge-neutral'>{text}</div>
  )
}

export default Badge