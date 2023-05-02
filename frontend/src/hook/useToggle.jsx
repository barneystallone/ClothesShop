import { useCallback, useState } from 'react'

const useToggle = (initValue = false) => {
  const [change, setChange] = useState(initValue)
  const toggle = useCallback(() => setChange((prev) => !prev), [])
  return [change, toggle]
}

export default useToggle
