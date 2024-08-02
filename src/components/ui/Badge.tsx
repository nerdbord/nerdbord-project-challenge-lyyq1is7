import React from 'react'

type BadgeProps = {
    text: string | null;
  };

const Badge =({text}: BadgeProps) => {
  return (
    <div className="badge badge-primary badge-lg">{text}</div>
  )
}

export default Badge