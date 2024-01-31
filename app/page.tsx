import Link from 'next/link';
import Header from '@/components/Header';

export default function Home() {
  return (
    <>
      <Header /> {/* Reuse the header UI component */}
      <section className='py-24'>
        <div className='container'>
          <h1 className='text-3xl font-bold'>Demo</h1>
        </div>
      </section>
    </>
  );
}