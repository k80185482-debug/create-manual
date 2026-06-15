import { getProject } from '@/app/actions/getProject'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DrawerWithSides } from './sideDrawer'

export default async function ManualList () {
  
  const ProjectData = await getProject()
  console.log(ProjectData)
  
  return (
    <>
      <div className='flex'>
        <DrawerWithSides />
      </div>
      <div className='flex flex-wrap justify-center p-10 gap-20'>
        <article className='shadow-md hover:shadow-xl transition-shadow my-4 w-full max-w-sm border border-slate-200 rounded-xl overflow-hidden'>
          <Link href="#">
            <Image src="https://picsum.photos/400/240" width={400} height={240} alt='' className='w-full h-60 object-cover'/>
          </Link>
          <div className='bg-gray-100 p-2'>
            <Link href="#" className='font-bold text-3xl'>Example</Link>
            <p>Published on 2025/12/1</p>
          </div> 
        </article>
        {ProjectData.map((project) => (
          <article key={project.id} className='shadow-md hover:shadow-xl transition-shadow my-4 w-full max-w-sm border border-slate-200 rounded-xl overflow-hidden'>
            <Link href={`/manage/posts/project/${project.id}`} className="block text-xl font-bold hover:text-blue-600">
              <Image src={project.imageUrl || "https://placehold.jp/400x240.png"} width={320} height={240} alt='' className='w-full h-60 object-cover'/>
            </Link>
            <div className='bg-gray-100 p-2'>
              <Link href={`/manage/posts/project/${project.id}`} className='font-bold text-3xl'>{project.name}</Link>
              <p>Published on 2025/12/1</p>
            </div> 
          </article>
        ))}
      </div>
    </>
  )
}