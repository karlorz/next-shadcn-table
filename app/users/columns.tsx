import React from 'react';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';

export const columns = [
  {
    accessorKey: 'system',
    header: 'System',
  },
  {
    accessorKey: 'month',
    header: 'Month',
  },
  // {
  //   accessorKey: 'reports',
  //   header: 'Reports',
  //   cell: (row: any) => (
  //     <Button variant="link">
  //       <MoreHorizontal size={16} />
  //       View Reports
  //     </Button>
  //   ),
  // },
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