import { useState } from 'react'

const useToggle = (initValue = false) => {
  const [change, setChange] = useState(initValue)
  const toggle = () => setChange(!change)
  return [change, toggle]
}

export default useToggle
