import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const type = searchParams.get('type') || 'all'
  const sort = searchParams.get('sort') || 'latest'

  const result = await db.files.findAll({ page, limit, type, sort })

  return NextResponse.json({
    success: true,
    data: result.data,
    pagination: result.pagination
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const newFile = await db.files.create({
      title: body.title,
      author: body.author,
      size: body.size,
      excerpt: body.excerpt
    })

    return NextResponse.json({
      success: true,
      data: newFile,
      message: '文件创建成功'
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: '创建失败，请检查输入'
    }, { status: 400 })
  }
}
