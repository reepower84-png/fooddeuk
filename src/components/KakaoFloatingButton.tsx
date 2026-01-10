'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function KakaoFloatingButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤이 100px 이상이면 버튼 표시
      setIsVisible(window.scrollY > 100);
    };

    // 초기 상태 설정
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <a
      href="http://pf.kakao.com/_SxcxbBC/chat"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl overflow-hidden ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="카카오톡 상담"
    >
      <Image
        src="/카톡_원형_로고.png"
        alt="카카오톡 상담"
        width={64}
        height={64}
        className="w-full h-full object-cover"
      />
    </a>
  );
}
