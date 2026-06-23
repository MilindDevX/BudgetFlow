import React from 'react';
import { cn } from '../../utils/cn';

export function Card({ className, ...props }) {
  return (
    <div
      className={cn("rounded-2xl border border-slate-200 bg-white shadow-soft", className)}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
}

export function CardTitle({ className, ...props }) {
  return (
    <h3
      className={cn("font-semibold leading-none tracking-tight text-slate-900", className)}
      {...props}
    />
  )
}

export function CardContent({ className, ...props }) {
  return (
    <div className={cn("p-6 pt-0", className)} {...props} />
  )
}
