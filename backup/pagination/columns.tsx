'use client'

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
  {
    accessorKey: 'reports.FDDA1-01',
    header: 'FDDA1-01'
  },
  {
    accessorKey: 'reports.FDDA1-04',
    header: 'FDDA1-04'
  },
  {
    accessorKey: 'reports.FDDA1-05',
    header: 'FDDA1-05'
  },
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
