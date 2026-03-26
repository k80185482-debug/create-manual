import { getProject } from '@/app/actions/getProject'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function ManualList () {
  
  const ProjectData = await getProject()
  console.log(ProjectData)
  
  return (
    <div className='flex flex-wrap p-5 gap-5'>
      <article className='shadow my-4 w-60'>
        <Link href="/contents/mdx-page">
          <Image src="https://picsum.photos/240/180" width={240} height={180} alt=''/>
        </Link>
        <div className='bg-gray-100'>
          <Link href="#" className='font-bold text-3xl'>案件名</Link>
          <p>作成者：前田</p>
          <p>Published on 2025/12/1</p>
        </div> 
      </article>
      <article className='shadow my-4 w-60'>
        <Link href="#">
          <Image src="https://picsum.photos/240/180" width={240} height={180} alt=''/>
        </Link>
        <div className='bg-gray-100'>
          <Link href="#" className='font-bold text-3xl'>案件名</Link>
          <p>作成者：前田</p>
          <p>Published on 2025/12/1</p>
        </div> 
      </article>
      <article className='shadow my-4 w-60'>
        <Link href="#">
          <Image src="https://picsum.photos/240/180" width={240} height={180} alt=''/>
        </Link>
        <div className='bg-gray-100'>
          <Link href="#" className='font-bold text-3xl'>案件名</Link>
          <p>作成者：前田</p>
          <p>Published on 2025/12/1</p>
        </div> 
      </article>
      {ProjectData.map((project) => (
        <article key={project.id} className='shadow my-4 w-60'>
          <Link href={`/manage/posts/project/${project.id}`}>
            <Image src="https://picsum.photos/240/180" width={240} height={180} alt=''/>
          </Link>
          <div className='bg-gray-100'>
            <Link href={`/posts/project/${project.id}`} className='font-bold text-3xl'>{project.name}</Link>
            <p>作成者：{project.authorId}</p>
            <p>Published on 2025/12/1</p>
          </div> 
        </article>
      ))}
    </div>
      
  )
}