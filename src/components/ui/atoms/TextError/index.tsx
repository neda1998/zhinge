import React from 'react'

const TextError = ({ props }: any) => {
  return (
    <div className='text-red-600'>
      {props.children}
    </div>
  )
}

export default TextError