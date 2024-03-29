import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import useClashDataRemote from '../hooks/useClashDataRemote'

type ClashId = number

export type ClashRecord = Record<ClashId, Clash>

interface Schedule {
  id: number
  registrationTime: number
  startTime: number
  cancelled: boolean
}

export interface Clash {
  id: ClashId
  themeId: number
  nameKey: string
  nameKeySecondary: string
  schedule: Schedule[]
}

class ClashData {
  constructor(
    public current: Clash | null | undefined,
    public clashes: Clash[],
    public nextClash: () => void,
    public previousClash: () => void,
    public selectClash: (clash: Clash) => void,
    public unselectClash: () => void,
    public isLoading: boolean,
    public selectNearestClash: () => void) { }
}

const ClashDataContext = createContext(new ClashData(null, [], () => { }, () => { }, () => { }, () => { }, false, () => { }))

interface ClashDataProviderProps extends React.PropsWithChildren {
  region: string
}

export const ClashDataProvider = ({ children, region }: ClashDataProviderProps): JSX.Element => {
  const [current, setCurrent] = useState<Clash | undefined | null>(null)

  const { data, isLoading } = useClashDataRemote(region)

  useEffect(() => {
    if (isLoading) setCurrent(null)
  }, [isLoading])

  const clashes = useMemo(() => {
    setCurrent(null)

    return data != null ? data : []
  }, [data])

  const selectNearestClash = useCallback(() => {
    const getNearestClash = (clashes: Clash[]) => {
      if (clashes.length === 0) return null

      return clashes.reduce(
        (acc, clash) =>
          acc.schedule[0].startTime < clash.schedule[0].startTime
            ? acc
            : clash
      )
    }

    const nearestClash = getNearestClash(clashes)
    setCurrent(nearestClash)
  }, [clashes])

  const getCurrentIndex = useCallback(() => {
    if (current == null) return null
    const index = clashes.findIndex((clash) => {
      return clash.id === current.id
    })

    return index === -1 ? null : index
  }, [current, clashes])

  const nextClash = useCallback(() => {
    const currentIndex = getCurrentIndex()

    if (currentIndex == null) {
      setCurrent(clashes.at(0))
    } else {
      const newIndex = (currentIndex + 1) % clashes.length

      setCurrent(clashes.at(newIndex))
    }
  }, [getCurrentIndex, clashes])

  const previousClash = useCallback(() => {
    const currentIndex = getCurrentIndex()

    if (currentIndex == null) {
      setCurrent(clashes.at(-1))
    } else {
      const newIndex = (currentIndex - 1) % clashes.length

      setCurrent(clashes.at(newIndex))
    }
  }, [getCurrentIndex, clashes])

  const selectClash = useCallback((clash: Clash) => {
    setCurrent(clash)
  }, [])

  const unselectClash = useCallback(() => {
    setCurrent(null)
  }, [])

  const value = useMemo(() => new ClashData(current, clashes, nextClash, previousClash, selectClash, unselectClash, isLoading, selectNearestClash), [current, clashes, nextClash, previousClash, selectClash, unselectClash, isLoading, selectNearestClash])

  return (
    <ClashDataContext.Provider value={value}>
      {children}
    </ClashDataContext.Provider>
  )
}

export const useClashData = () => {
  return useContext(ClashDataContext)
}
