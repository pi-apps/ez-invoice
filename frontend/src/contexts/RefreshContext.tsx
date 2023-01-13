import React, { useState, useEffect, useRef } from 'react'


const IMMEDIATE_INTERVAL = 3000
const FAST_INTERVAL = 10000
const SLOW_INTERVAL = 60000

const RefreshContext = React.createContext({ slow: 0, fast: 0 , immediate: 0})

// Check if the tab is active in the user browser
const useIsBrowserTabActive = () => {
  const isBrowserTabActiveRef = useRef(true)

  useEffect(() => {
    const onVisibilityChange = () => {
      isBrowserTabActiveRef.current = !document.hidden
    }

    window.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      window.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return isBrowserTabActiveRef
}

// This context maintain 2 counters that can be used as a dependencies on other hooks to force a periodic refresh
const RefreshContextProvider = ({ children }: any) => {
  const [slow, setSlow] = useState(0)
  const [fast, setFast] = useState(0)
  const [immediate, setImmediate] = useState(0)

  const isBrowserTabActiveRef = useIsBrowserTabActive()

  useEffect(() => {
    const interval = setInterval(async () => {
      if (isBrowserTabActiveRef.current) {
        setFast((prev: number) => prev + 1)
      }
    }, FAST_INTERVAL)
    return () => clearInterval(interval)
  }, [isBrowserTabActiveRef])

  useEffect(() => {
    const interval = setInterval(async () => {
      if (isBrowserTabActiveRef.current) {
        setSlow((prev: number) => prev + 1)
      }
    }, SLOW_INTERVAL)
    return () => clearInterval(interval)
  }, [isBrowserTabActiveRef])

  useEffect(() => {
    const interval = setInterval(async () => {
      if (isBrowserTabActiveRef.current) {
        setImmediate((prev: number) => prev + 1)
      }
    }, IMMEDIATE_INTERVAL)
    return () => clearInterval(interval)
  }, [isBrowserTabActiveRef])

  return <RefreshContext.Provider value={{ slow, fast , immediate }}>{children}</RefreshContext.Provider>
}

export { RefreshContext, RefreshContextProvider }
