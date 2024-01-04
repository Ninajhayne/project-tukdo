"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import { FaMedal } from "react-icons/fa";
import { Row } from '@tanstack/react-table';

import { Button } from "@/components/ui/button";

// Define a custom cell context that includes the 'rows' property
interface CustomCellContext<TData> extends CellContext<TData, unknown> {
  rows: Row<TData>[];
}

const RankCell: React.FC<CustomCellContext<Course>> = (props) => {
  const { row, rows } = props;
  const currentRowRating = row.original.rating;
  const sortedRows = rows.slice().sort((a, b) => b.original.rating - a.original.rating);
  const currentRank = sortedRows.findIndex((r) => r.original.rating === currentRowRating) + 1;

  let medalColor;
  // Assign different colors based on the rank
  if (currentRank === 1) {
    medalColor = "#FFE600"; // Gold
  } else if (currentRank === 2) {
    medalColor = "#C0C0C0"; // Silver
  } else if (currentRank === 3) {
    medalColor = "#CD7F32"; // Bronze
  }

  // Conditionally render FaMedal with the specified color
  const renderRank = currentRank <= 3 ? <FaMedal color={medalColor} size={"1.5rem"} /> : currentRank;

  return <span className="text-base font-semibold">{renderRank}</span>;
};

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Rank
        </Button>
      );
    },
    cell: (props) => <RankCell {...props as CustomCellContext<Course>} />,
    
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button variant="ghost">
          Title
        </Button>
      );
    },
  },
  {
    accessorKey: "rating",
    header: ({ column }) => {
      return (
        <Button variant="ghost">
          Rating
        </Button>
      );
    },

    cell: ({ row }) => {
      const rating = row.original.rating as number; // or use a type assertion
      return <span className="text-base font-medium">{rating.toFixed(1)}</span>;
    },
  },
];
