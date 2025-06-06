"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowDownAZ, ArrowDownZA, ArrowDown01, ArrowDown10 } from "lucide-react"

interface SortMenuProps {
  onSort: (criteria: string, order: "asc" | "desc") => void
}

export function SortMenu({ onSort }: SortMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          Эрэмбэлэх
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onSort("score", "desc")}>
          <ArrowDown10 className="mr-2 h-4 w-4" />
          Дүнгээр (их → бага)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSort("score", "asc")}>
          <ArrowDown01 className="mr-2 h-4 w-4" />
          Дүнгээр (бага → их)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSort("name", "asc")}>
          <ArrowDownAZ className="mr-2 h-4 w-4" />
          Нэрээр (А → Я)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSort("name", "desc")}>
          <ArrowDownZA className="mr-2 h-4 w-4" />
          Нэрээр (Я → А)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
