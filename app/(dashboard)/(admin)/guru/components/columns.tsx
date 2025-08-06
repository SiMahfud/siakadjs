"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "./data-table-row-actions";

// This type is manually created based on the data fetched in the page.
export type GuruWithUser = {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  guru: {
    id: string;
    nuptk: string;
    userId: string;
  } | null;
};

export const columns: ColumnDef<GuruWithUser>[] = [
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "guru.nuptk",
    header: "NUPTK",
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
