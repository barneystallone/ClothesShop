import { useState } from 'react'

const useToggle = () => {
  const [change, setChange] = useState(false)
  const toggle = () => setChange(!change)
  return [change, toggle]
}

export default useToggle
