import { memo, useEffect } from 'react'
import { useLocation, Location, useNavigationType } from 'react-router-dom'
import {
  setScrollPosition,
  saveScrollHistory,
  restoreScrollHistory,
} from 'modules/appCore/scrollUtils'

type Props = {
  action: string
  location: Location
}

export function ScrollRestoratorInner({ location }: Props) {
  useEffect(() => {
    restoreScrollHistory(String(location.key))
  }, [location.key])
  return null
}

const ScrollRestoratorComparator = memo(
  ScrollRestoratorInner,
  (prevProps: Props, nextProps: Props) => {
    const { location: prev, action } = prevProps
    const { location: next } = nextProps

    const isLocationChanged =
      (next.pathname !== prev.pathname || next.search !== prev.search) &&
      next.hash === ''

    if (isLocationChanged) {
      if (action === 'POP') {
        setScrollPosition(0)
      }
      const key = String(prev.key)
      saveScrollHistory(key)
    }

    return false
  },
)

export const ScrollRestorator = memo(() => {
  const location = useLocation()
  const action = useNavigationType()
  return <ScrollRestoratorComparator action={action} location={location} />
})
