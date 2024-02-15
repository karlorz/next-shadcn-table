import { pullReport } from '@/utils/api-requests';
import reporta1 from '@/constants/fdda1_report.json';

async function handlePullReport() {
  try {
    const response = await pullReport(reporta1); // Replace reporta1 with the appropriate parameter
    const data = await response.text();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}
export default function Home() {
  return (
    <>
      <section className='py-0'>
        <div className='container'>
        <button onClick={handlePullReport}>Pull Report</button>
        </div>
      </section>
    </>
  );
}