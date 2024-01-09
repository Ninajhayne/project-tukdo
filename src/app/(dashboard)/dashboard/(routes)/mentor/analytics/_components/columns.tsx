"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { Purchase, Course } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";


type buyer = {
  user: {
    name: string;
  };
  course: {
    title: string;
    price: number | null;
  };
  createdAt: Date;
};

export const columns: ColumnDef<buyer>[] = [
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
    accessorKey: "course.title",
    header: ({ column }) => {
      return (
        <span>
          Title
        </span>
      );
    },
    cell: ({ row }) => {
      const course = row.original.course;
  
      return (
        <div className="line-clamp-2">
          {course.title}
        </div>
      );
    },
  },
  {
    accessorKey: "course.price",
    header: ({ column }) => {
      return (
        <span>
          Price
        </span>
      );
    },
    cell: ({ row }) => {
      const course = row.original.course;

      if (course.price === null) {
        return <p>N/A</p>; // Or any other handling for null value
      }

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP"
      }).format(course.price);
  
      return (
        <div>
          {course.price === 0 ? (
            <p>Free</p>
          ) : (
            formatted
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <span>          
          Date
        </span>
      );
    },
    cell: ({ row }) => {
      const createdAt = new Date(row.original.createdAt);
    
      const formattedDate = createdAt.toLocaleDateString('en-US', {
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
]
