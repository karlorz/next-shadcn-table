'use client'

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

export type Report = {
  system: string;
  month: string;
  reports: {
    'FDDA1-01': string;
    'FDDA1-04': string;
    'FDDA1-05': string;
  };
};

export const columns: ColumnDef<Report>[]= [
  {
    accessorKey: 'system',
    header: 'System',
  },
  {
    accessorKey: 'month',
    header: 'Month',
  },
  {
    accessorKey: 'reports.FDDA1-01',
    header: 'FDDA1-01',
  },
  {
    accessorKey: 'reports.FDDA1-04',
    header: 'FDDA1-04',
  },
  {
    accessorKey: 'reports.FDDA1-05',
    header: 'FDDA1-05',
  },
];