import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className='bg-blue-300 py-5 px-10 border-b flex justify-between items-center'>
      <div>
        <h1 className='text-2xl font-extrabold'>
          <Link href="/">手順書作成</Link>
        </h1>
      </div>
      <div>
        <nav className='text-sm font-medium'>
          <Link href="/procedure/new" className='bg-orange-300 px-3 py-3 rounded-md'>新規作成</Link>
        </nav>
      </div>
      <div>
        <nav className='text-sm font-medium'>
          <Link href="/auth/signup" className='bg-orange-300 px-3 py-3 rounded-md'>サインアップ</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header