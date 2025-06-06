"use client"

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface DeleteSchoolDialogProps {
  open: boolean
  onCloseAction: () => void
  onConfirmAction: () => Promise<void>
   onDeletedAction: () => void;
  schoolName: string
  schoolId: string | number
}

export function DeleteSchoolDialog({ 
  open, 
  onCloseAction, 
  onConfirmAction, 
  schoolName, 
  schoolId 
}: DeleteSchoolDialogProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    setIsLoading(true)
    
    try {
      await onConfirmAction()
      onCloseAction()
    } catch (error) {
      console.error('Delete error:', error)
      // Parent component handles error toast or UI
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onCloseAction}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Сургуулийг устгах</DialogTitle>
        </DialogHeader>
        <p className="py-4">
          Та "<strong>{schoolName}</strong>" сургуулийг устгахдаа итгэлтэй байна уу?
        </p>
        <DialogFooter className="flex justify-end gap-2">
          <Button 
            variant="outline" 
            onClick={onCloseAction}
            disabled={isLoading}
            className="px-4 py-2 rounded-md text-sm bg-transparent border-2 border-gray-200 text-gray-500 hover:bg-gray-200 hover:text-black"
          >
            Болих
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            disabled={isLoading}
            className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
          >
            {isLoading ? 'Устгаж байна...' : 'Устгах'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
