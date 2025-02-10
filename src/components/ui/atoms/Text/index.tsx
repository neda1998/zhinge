import React from 'react';

const Text = ({ children, className }: any) => {
  return (
    <>
      <span className={className} >{children}</span>
    </>
  )
};

export default Text;
