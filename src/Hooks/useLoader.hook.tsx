import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  startTimer: boolean;
  endTimer: boolean;
  duration: number;
}

/**
 * Presentation component for useLoader hook
 * 
 * @component
 * @param startTimer - boolean trigered by on mouse down click
 * @param endTimer - boolean trigered by on mouse up
 * @param duration - in miliseconds for the time the loader should be fully loaded
 * @returns 
 * @LoaderComponent - initialy grey full width line, which turns coral orange for the time
 * the @param startTimer is true
 * @example
 * const MyComponent = () => {
 * const [startTimer, setStartTimer] = useState(false)
 * const [endTimer, setEndTimer] = useState(false)
 * const [displayText, setDisplayText] = useState(false)
 * const { LoaderComponent, success } = useLoader({ 
 *   startTimer, 
 *   endTimer, 
 *   duration: 1000 
 * })
 *
 * useEffect(() => {
 *   if (endTimer) {
 *     setEndTimer(false)
 *   }
 * }, [endTimer])
 *
 * const onMouseUp = () => {
 *   setEndTimer(true)
 *   setStartTimer(false)
 *   success && setDisplayText(true)
 * }
 *
 * return (
 *   <>
 *      <button
 *        onMouseDown={() => setStartTimer(true)}
 *        onMouseUp={onMouseUp}
 *      >
 *        Click Me!
 *      </button>
 *     {LoaderComponent}
 *     {displayText && <p>You Have Made It!</p>}
 *   </>
 * )}
 */
const useLoader = ({ startTimer, endTimer, duration }: Props) => {
  const [count, setCount] = useState(0)
  const intervalId = useRef<NodeJS.Timer>()
  const MAX_COUNT = 10
  
  useEffect(() => {
    if (startTimer) {
      intervalId.current = setInterval(() => setCount(state => state + 1), duration / MAX_COUNT)
      }
    if (endTimer) {
      clearInterval(intervalId.current)
      setCount(0)
    }
  }, [startTimer, endTimer])

  const LoaderComponent = useMemo(() => (
    <>
      {startTimer && <div className="loading-wrapper">
        {count >= 1 && <div className="loading-item" />}
        {count >= 2 && <div className="loading-item" />}
        {count >= 3 && <div className="loading-item" />}
        {count >= 4 && <div className="loading-item" />}
        {count >= 5 && <div className="loading-item" />}
        {count >= 6 && <div className="loading-item" />}
        {count >= 7 && <div className="loading-item" />}
        {count >= 8 && <div className="loading-item" />}
        {count >= 9 && <div className="loading-item" />}
        {count >= 10 && <div className="loading-item" />}
      </div>}
    </>
  ), [startTimer, count])

  return {
    LoaderComponent: count > 0 ? LoaderComponent : null,
    success: count >= MAX_COUNT
  }
}

export default useLoader