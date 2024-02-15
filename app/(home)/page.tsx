import Link from 'next/link';
export default function Home() {
  return (
    <>
      <section className='py-0'>
        <div className='container'>
          <h1>Getting Started</h1>
          <Link href='/test'>
            Go to Test Page
          </Link>
        </div>
      </section>
    </>
  );
}