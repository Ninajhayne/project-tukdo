"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { FaMedal } from "react-icons/fa";


import { Button } from "@/components/ui/button";

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
    cell: ({ row }) => {
      const rank = row.index + 1;

      let medalColor;
      let medalSize;

      // Assign different colors based on the rank
      if (rank === 1) {
        medalColor = "#FFE600"; // Gold
      } else if (rank === 2) {
        medalColor = "#C0C0C0"; // Silver
      } else if (rank === 3) {
        medalColor = "#CD7F32"; // Bronze

      }

      // Conditionally render FaMedal with the specified color
      const renderRank = rank <= 3 ? <FaMedal color={medalColor} size={"1.5rem"} /> : rank;

      return (
        <span className="text-base font-semibold">{renderRank}</span>
      );
    },
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
          <span className="text-[#FFE600]">★ </span>Ratings
        </Button>
      );
    },

    cell: ({ row }) => {
      const rating = row.original.rating as number; // or use a type assertion

    return (
      <span className="text-base font-medium">{rating.toFixed(1)}</span>
    )
    }
  },
  
]

/*
    cell: ({ row }) => {
      const isPublished = row.getValue("isPublished") || false;

      return (
        <Badge className={cn(
          "bg-slate-500",
          isPublished && "bg-sky-700"
        )}>
          {isPublished ? "Published" : "Draft"}
        </Badge>
      )
    }
    */
