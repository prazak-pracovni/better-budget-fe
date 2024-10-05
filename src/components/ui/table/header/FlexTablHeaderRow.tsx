import React from 'react'

interface Props {
    children: React.ReactNode
}

const FlexTableHeaderRow:React.FC<Props> = ({children}) => {
  return (
    <tr>{children}</tr>
  )
}

export default FlexTableHeaderRow;