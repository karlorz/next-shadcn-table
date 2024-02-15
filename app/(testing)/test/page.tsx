'use client'

import { useCallback } from 'react'
import { pullReport } from '@/utils/api-requests'
import reporta1 from '@/constants/fdda1_report.json'

import { Button } from '@/components/ui/button'

export default function Home() {
  const handlePullReport = useCallback(async () => {
    try {
      const response = await pullReport(reporta1) // Replace reporta1 with the appropriate parameter
      const data = await response.text()
      console.log(data)
    } catch (error) {
      console.error('Error:', error)
    }
  }, [])

  return (
    <>
      <section className='py-0'>
        <div className='container'>
          <Button
            onClick={handlePullReport}
            variant='outline'
            className='ml-auto'
          >
            Repull Report A1
          </Button>
        </div>
      </section>
    </>
  )
}
