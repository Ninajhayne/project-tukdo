"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { Purchase, Course } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";
import { SiPandas } from "react-icons/si";
import { Badge } from "@/components/ui/badge";


type reservations = {
  user: {
    name: string;
  };
  totalPrice: number;
  startDate: Date;
  endDate: Date;
  approved: boolean;
};

export const columns: ColumnDef<reservations>[] = [
  {
    accessorKey: "user.name",
    header: ({ column }) => {
      return (
        <span>
          Name
        </span>
      );
    },
    cell: ({ row }) => {
      const user = row.original.user;

      return (
        <div className="flex items-center">
          {user.name}
        </div>
      );
    },
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => {
      return (
        <span>
        Total Payment
        </span>
      );
    },
    cell: ({ row }) => {
      const totalPrice = parseFloat(row.getValue("totalPrice") || "0");

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP"
      }).format(totalPrice);

      return (
        <div>
          {totalPrice === 0 ? (
            <p>Free</p>
          ) : (
            formatted
          )}
        </div>
      );
    }
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <span>          
          Start Date
        </span>
      );
    },
    cell: ({ row }) => {
      const startDate = new Date(row.original.startDate);
    
      const formattedDate = startDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    
      return (
        <span>
          {formattedDate}
        </span>
      );
    },
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => {
      return (
        <span>          
          End Date
        </span>
      );
    },
    cell: ({ row }) => {
      const endDate = new Date(row.original.endDate);
    
      const formattedDate = endDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    
      return (
        <span>
          {formattedDate}
        </span>
      );
    },
  },
  {
    accessorKey: "approved",
    header: ({ column }) => {
      return (
        <span>          
          Approved
        </span>
      );
    },
    cell: ({ row }) => {
      const approved = row.getValue("approved") || false;

      return (
        <Badge className={cn(
          "bg-slate-500",
          approved && "bg-sky-700"
        )}>
          {approved ? "Approved" : "Not yet approve"}
        </Badge>
      )
    }
  },
]
