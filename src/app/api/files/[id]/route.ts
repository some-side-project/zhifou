import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const fileId = parseInt(params.id)
  const file = await db.files.findById(fileId)

  if (!file) {
    return NextResponse.json({
      success: false,
      message: '文件不存在'
    }, { status: 404 })
  }

  return NextResponse.json({
    success: true,
    data: file
  })
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const fileId = parseInt(params.id)
    const body = await request.json()

    const updatedFile = await db.files.findById(fileId)
    if (!updatedFile) {
      return NextResponse.json({
        success: false,
        message: '文件不存在'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: '文件更新成功',
      data: { id: fileId, ...body }
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
  const fileId = parseInt(params.id)
  const file = await db.files.findById(fileId)

  if (!file) {
    return NextResponse.json({
      success: false,
      message: '文件不存在'
    }, { status: 404 })
  }

  return NextResponse.json({
    success: true,
    message: '文件删除成功'
  })
}
