import React from 'react'

interface Props {
    children: React.ReactNode
}

const FlexTableRow:React.FC<Props> = ({children}) => {
  return (
    <div role="row" className='flex'>{children}</div>
  )
}

export default FlexTableRow