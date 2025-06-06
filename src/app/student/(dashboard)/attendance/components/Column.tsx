
import { ColumnDef } from "@tanstack/react-table";

export type User = {
  id: number;
  date: Date;
  reason: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "Дугаар",
  },
  {
    accessorKey: "date",
    header: "Огноо",
  },
  {
    accessorKey: "reason",
    header: "Шалтгаан",
  },
];
