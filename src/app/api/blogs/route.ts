import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const category = searchParams.get('category') || 'all'

  const result = await db.blogs.findAll({ page, limit, category })

  return NextResponse.json({
    success: true,
    data: result.data,
    pagination: result.pagination
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const newBlog = await db.blogs.create({
      title: body.title,
      author: body.author,
      excerpt: body.excerpt
    })

    return NextResponse.json({
      success: true,
      data: newBlog,
      message: '博客创建成功'
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: '创建失败，请检查输入'
    }, { status: 400 })
  }
}
