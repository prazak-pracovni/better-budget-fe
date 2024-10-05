import React from 'react'

interface Props {
    children: React.ReactNode
}

const FlexTableRow:React.FC<Props> = ({children}) => {
  return (
    <tr>{children}</tr>
  )
}

export default FlexTableRow