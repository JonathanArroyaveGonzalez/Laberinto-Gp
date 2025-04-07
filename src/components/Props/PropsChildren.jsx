import React from 'react'

const PropsChildren = (props) => {
  // TODO : El componente propschildren esta recibiendo un componente h1 como hijo a traves de la prop children
  return (
    <div className='panel'>{props.children}</div>
  )
}

export default PropsChildren