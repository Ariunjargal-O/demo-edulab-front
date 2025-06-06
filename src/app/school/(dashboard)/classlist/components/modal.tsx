// Modal.tsx
import { ReactNode } from "react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-blue-300 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-96">
        <button
          className="absolute top-2 right-2 text-xl"
          onClick={onClose}
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  )
}
