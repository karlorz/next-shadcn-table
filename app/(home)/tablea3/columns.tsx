'use client'

import reports from '@/constants/fdda3_report.json';
import Link from 'next/link'
import { ColumnDef } from '@tanstack/react-table'

import { MoreHorizontal, ArrowUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { Report } from '@/utils/api-requests'

// Get the list of columns from the reports data
const columnKeys = reports.reports;

export const columns: ColumnDef<Report>[] = [
  {
    accessorKey: 'system',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          System
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  },
  {
    accessorKey: 'month',
    header: 'Month'
  },
  ...columnKeys.map((key: string) => ({
    accessorKey: `reports.${key}`,
    header: key
  })),
  {
    id: 'actions',
    cell: ({ row }) => {
      const report = row.original
      const encodedSystem = encodeURIComponent(report.system)

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link href={`/reports/${encodedSystem}`}>
              <DropdownMenuItem>View Details</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
