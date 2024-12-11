"use client"

import { useState, useEffect } from 'react'

interface ToastProps {
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
  duration?: number
}

export function useToast() {
  const [toast, setToast] = useState<ToastProps | null>(null)

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null)
      }, toast.duration || 3000)

      return () => clearTimeout(timer)
    }
  }, [toast])

  const showToast = (props: ToastProps) => {
    setToast(props)
  }

  return {
    toast: showToast,
    activeToast: toast,
    dismissToast: () => setToast(null)
  }
}