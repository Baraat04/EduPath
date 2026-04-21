"use client"

import { useRef, useEffect, useState, ReactNode } from "react"

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  duration?: number
  once?: boolean
}

export function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 500,
  once = true,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once && ref.current) {
            observer.unobserve(ref.current)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [once])

  const getTransform = () => {
    if (isVisible) return "translate3d(0, 0, 0)"
    switch (direction) {
      case "up":
        return "translate3d(0, 40px, 0)"
      case "down":
        return "translate3d(0, -40px, 0)"
      case "left":
        return "translate3d(40px, 0, 0)"
      case "right":
        return "translate3d(-40px, 0, 0)"
      default:
        return "translate3d(0, 0, 0)"
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  )
}

export function FadeInStagger({
  children,
  className = "",
  staggerDelay = 100,
}: {
  children: ReactNode[]
  className?: string
  staggerDelay?: number
}) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <FadeIn key={index} delay={index * staggerDelay}>
          {child}
        </FadeIn>
      ))}
    </div>
  )
}
