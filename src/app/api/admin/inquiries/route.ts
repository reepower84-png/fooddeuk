import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

type InquiryStatus = 'pending' | 'contacted' | 'completed';

// 간단한 인증 체크 (헤더에서 비밀번호 확인)
function checkAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('x-admin-password');
  return authHeader === process.env.ADMIN_PASSWORD;
}

// GET: 모든 문의 조회
export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json(
      { error: '인증이 필요합니다.' },
      { status: 401 }
    );
  }

  try {
    const { data: inquiries, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: '문의 목록을 가져오는 데 실패했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ inquiries });
  } catch (error) {
    console.error('Get inquiries error:', error);
    return NextResponse.json(
      { error: '문의 목록을 가져오는 데 실패했습니다.' },
      { status: 500 }
    );
  }
}

// PATCH: 문의 상태 업데이트
export async function PATCH(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json(
      { error: '인증이 필요합니다.' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: 'ID와 상태는 필수 항목입니다.' },
        { status: 400 }
      );
    }

    const validStatuses: InquiryStatus[] = ['pending', 'contacted', 'completed'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: '유효하지 않은 상태입니다.' },
        { status: 400 }
      );
    }

    const { data: inquiry, error } = await supabase
      .from('inquiries')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: '문의를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      inquiry,
    });
  } catch (error) {
    console.error('Update inquiry error:', error);
    return NextResponse.json(
      { error: '상태 업데이트에 실패했습니다.' },
      { status: 500 }
    );
  }
}

// DELETE: 문의 삭제
export async function DELETE(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json(
      { error: '인증이 필요합니다.' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID는 필수 항목입니다.' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('inquiries')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: '문의를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: '삭제되었습니다.',
    });
  } catch (error) {
    console.error('Delete inquiry error:', error);
    return NextResponse.json(
      { error: '삭제에 실패했습니다.' },
      { status: 500 }
    );
  }
}
