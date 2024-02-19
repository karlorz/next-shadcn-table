import Link from 'next/link'

export default function Header() {
  return (
    <header className='py-4'>
      <nav className='container flex items-center'>
        <ul className='flex space-x-4'>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/charta1'>ChartA1</Link>
          </li>
          <li>
            <Link href='/charta2'>ChartA2</Link>
          </li>
          <li>
            <Link href='/charta3'>ChartA3</Link>
          </li>
          <li>
            <Link href='/tablea1'>TableA1</Link>
          </li>
          <li>
            <Link href='/tablea2'>TableA2</Link>
          </li>
          <li>
            <Link href='/tablea3'>TableA3</Link>
          </li>
          <li>
            <Link href='/reports'>Reports</Link>
          </li>
          <li>
            <Link href='/heatmap'>(Heatmap)</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
