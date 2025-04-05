"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"

interface Size {
  width: number
  height: number
}

export function useResizeObserver(ref: React.RefObject<HTMLElement>) {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 })
  const observerRef = useRef<ResizeObserver | null>(null)

  useEffect(() => {
    if (!ref.current) return

    // Initialize with current size
    setSize({
      width: ref.current.clientWidth,
      height: ref.current.clientHeight,
    })

    // Create observer
    observerRef.current = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      setSize({ width, height })
    })

    // Start observing
    observerRef.current.observe(ref.current)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [ref])

  return size
}

