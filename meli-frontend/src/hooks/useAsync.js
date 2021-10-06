import useSafeDispatch from './useSafeDispatch'
import { useReducer, useCallback } from 'react'

export const states = {
  ILDE: 'ilde',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
}

function asyncReducer(state, action) {
  switch (action.type) {
    case states.PENDING: {
      return { status: states.PENDING, data: null, error: null }
    }
    case states.RESOLVED: {
      return { status: states.RESOLVED, data: action.data, error: null }
    }
    case states.REJECTED: {
      return { status: states.REJECTED, data: null, error: action.error }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export default function useAsync(initialState) {
  const [state, unsafeDispatch] = useReducer(asyncReducer, {
    status: states.ILDE,
    data: null,
    error: null,
    ...initialState,
  })

  const dispatch = useSafeDispatch(unsafeDispatch)

  const { data, error, status } = state

  const run = useCallback(
    (promise) => {
      dispatch({ type: states.PENDING })
      promise.then(
        (data) => {
          dispatch({ type: states.RESOLVED, data })
        },
        (error) => {
          dispatch({ type: states.REJECTED, error })
        }
      )
    },
    [dispatch]
  )

  return {
    error,
    status,
    data,
    run,
  }
}
