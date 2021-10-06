import { useHistory } from 'react-router'

const isSameLocation = (currentLocation, nextLocation) => {
  return currentLocation === nextLocation
}

const useNavigate = () => {
  const { push, location } = useHistory()
  const currentLocation = `${location.pathname}${location.search}`
  return (nextLocation) => {
    if (!isSameLocation(currentLocation, nextLocation)) {
      push(nextLocation)
    }
  }
}
export default useNavigate
