import Link from 'next/link';

export default function Header() {
  return (
    <header className='py-4'>
      <nav className='container flex items-center'>
        <ul className='flex space-x-4'>
          <li>
            <Link href='/' legacyBehavior>
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href='/reports' legacyBehavior>
              <a>Reports</a>
            </Link>
          </li>
          <li>
            <Link href='/table' legacyBehavior>
              <a>Table</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}