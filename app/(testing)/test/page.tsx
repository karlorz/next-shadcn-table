'use client'

import { useCallback } from 'react';
import { pullReport } from '@/utils/api-requests';
import reporta1 from '@/constants/fdda1_report.json';
import reporta2 from '@/constants/fdda2_report.json';
import reporta3 from '@/constants/fdda3_report.json';

import { Button } from '@/components/ui/button';

export default function Home() {
  const handlePullReport = useCallback(async (report) => {
    try {
      const response = await pullReport(report);
      const data = await response.text();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }, []);

  return (
    <>
      <section className='py-0'>
        <div className='container'>
          <Button
            onClick={() => handlePullReport(reporta1)}
            variant='outline'
            className='ml-auto'
          >
            Repull Report A1
          </Button>
        </div>
      </section>
      <section>
        <div className='container'>
          <pre>{JSON.stringify(reporta1, null, 2)}</pre>
        </div>
      </section>
      <section className='py-0'>
        <div className='container'>
          <Button
            onClick={() => handlePullReport(reporta2)}
            variant='outline'
            className='ml-auto'
          >
            Repull Report A2
          </Button>
        </div>
      </section>
      <section>
        <div className='container'>
          <pre>{JSON.stringify(reporta2, null, 2)}</pre>
        </div>
      </section>
      <section className='py-0'>
        <div className='container'>
          <Button
            onClick={() => handlePullReport(reporta3)}
            variant='outline'
            className='ml-auto'
          >
            Repull Report A3
          </Button>
        </div>
      </section>
      <section>
        <div className='container'>
          <pre>{JSON.stringify(reporta3, null, 2)}</pre>
        </div>
      </section>
    </>
  );
}