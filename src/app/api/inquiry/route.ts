import { NextRequest, NextResponse } from 'next/server';
import { sendDiscordNotification } from '@/lib/discord';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, message } = body;

    // Validation
    if (!name || !phone) {
      return NextResponse.json(
        { error: '이름과 연락처는 필수 항목입니다.' },
        { status: 400 }
      );
    }

    // Phone format validation
    const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
    const cleanPhone = phone.replace(/-/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { error: '올바른 연락처 형식이 아닙니다.' },
        { status: 400 }
      );
    }

    // Send Discord notification directly
    const sent = await sendDiscordNotification(name, phone, message || '');

    if (!sent) {
      return NextResponse.json(
        { error: '알림 전송 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: '상담 신청이 완료되었습니다.',
    });
  } catch (error) {
    console.error('Inquiry submission error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}
