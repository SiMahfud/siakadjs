"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "./data-table-row-actions";

// This type is manually created based on the data fetched in the page.
export type SiswaWithUser = {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  siswa: {
    id: string;
    nis: string;
    nisn: string;
    userId: string;
    kelasId: string | null;
  } | null;
};

export const columns: ColumnDef<SiswaWithUser>[] = [
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "siswa.nis",
    header: "NIS",
  },
  {
    accessorKey: "siswa.nisn",
    header: "NISN",
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
