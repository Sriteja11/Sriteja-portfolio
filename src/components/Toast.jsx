import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MotionDiv = motion.div

export function Toast({ toast }) {
  return (
    <AnimatePresence>
      {toast && (
        <MotionDiv
          className="toast-pill"
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.16 }}
          role="status"
          aria-live="polite"
        >
          <span className="toast-dot" />
          <span>{toast.message}</span>
        </MotionDiv>
      )}
    </AnimatePresence>
  )
}
