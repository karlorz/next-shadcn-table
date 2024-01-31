import Link from 'next/link';

export default function Header() {
  return (
    <header className='py-4'>
      <nav className='container flex items-center'>
        <ul className='flex space-x-4'>
          <li>
            <Link href='/' legacyBehavior>
              <a className='text-gray-800 hover:text-gray-600'>Home</a>
            </Link>
          </li>
          <li>
            <Link href='/reports' legacyBehavior>
              <a className='text-gray-800 hover:text-gray-600'>Reports</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}