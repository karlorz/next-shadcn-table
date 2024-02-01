// reports/[system].tsx

import { useRouter } from 'next/router';
import { getReportBySystem } from '@/utils/api-requests';
import { useQuery } from '@tanstack/react-query';

export default function ReportDetails() {

  const router = useRouter();
  const { system } = router.query;

  const { data: report } = useQuery({
    queryKey: ['report', system], 
    queryFn: () => getReportBySystem(system as string)
  });

  if (!report) {
    return <div>Report not found</div>;
  }

  return (
    <div>
      <h1>{report.system}</h1>

      <form>
        <label>
          FDDA1-01
          <input 
            type="text"
            value={report.reports['FDDA1-01']}
          />
        </label>

        <label>
          FDDA1-04  
          <input
            type="text"
            value={report.reports['FDDA1-04']} 
          />
        </label>

        <label>
          FDDA1-05
          <input 
            type="text"
            value={report.reports['FDDA1-05']}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );

}
