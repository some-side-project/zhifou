import { NextResponse } from 'next/server'
import { popularBlogs } from '@/lib/mock-data'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const blogId = parseInt(params.id)
  const blog = popularBlogs.find(b => b.id === blogId)

  if (!blog) {
    return NextResponse.json({
      success: false,
      message: '博客不存在'
    }, { status: 404 })
  }

  return NextResponse.json({
    success: true,
    data: blog
  })
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const blogId = parseInt(params.id)
    const body = await request.json()

    return NextResponse.json({
      success: true,
      message: '博客更新成功',
      data: {
        id: blogId,
        ...body,
        updatedAt: new Date().toISOString()
      }
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: '更新失败'
    }, { status: 400 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const blogId = parseInt(params.id)

  return NextResponse.json({
    success: true,
    message: '博客删除成功'
  })
}
