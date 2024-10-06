import React from 'react'

interface Props {
    children: React.ReactNode
}

const FlexTableHeaderRow:React.FC<Props> = ({children}) => {
  return (
    <div role="row" className="flex">{children}</div>
  )
}

export default FlexTableHeaderRow;