'use client';

import { useEffect, useRef } from 'react';

const successStories = [
  {
    name: '김OO 사장님',
    location: '서울 강남구',
    period: '운영 8개월',
    revenue: '월 매출 2,500만원',
    comment:
      '직장생활 10년 하다가 창업했는데, 푸드득 덕분에 초기 비용 부담 없이 시작할 수 있었어요. 여러 메뉴를 동시에 운영하니까 매출이 꾸준히 나옵니다.',
    avatar: '👨‍🍳',
  },
  {
    name: '이OO 사장님',
    location: '경기 수원시',
    period: '운영 1년 2개월',
    revenue: '월 매출 3,200만원',
    comment:
      '처음엔 치킨만 하다가 중식, 한식까지 추가했더니 매출이 2배로 늘었어요. 밀키트라 조리도 간단하고, 본사 지원도 확실합니다.',
    avatar: '👩‍🍳',
  },
  {
    name: '박OO 사장님',
    location: '인천 부평구',
    period: '운영 6개월',
    revenue: '월 매출 1,800만원',
    comment:
      '투잡으로 시작했는데 이제 전업으로 전환했습니다. 배달 중심이라 인건비도 적게 들고, 시간 활용이 자유로워서 좋아요.',
    avatar: '👨‍💼',
  },
];

export default function SuccessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.section-fade-in');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="success"
      ref={sectionRef}
      className="py-20 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 section-fade-in">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
            성공 사례
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            푸드득과 함께<br />
            <span className="text-[#FF6B35]">성공한 사장님들</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            이미 많은 분들이 푸드득으로 성공적인 창업을 하셨습니다.<br />
            다음은 당신의 차례입니다.
          </p>
        </div>

        {/* Success Stories */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 section-fade-in">
          {successStories.map((story, index) => (
            <div
              key={index}
              className="card-hover bg-gradient-to-br from-gray-50 to-white p-6 md:p-8 rounded-2xl border border-gray-100"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center text-2xl">
                  {story.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{story.name}</h3>
                  <p className="text-sm text-gray-500">{story.location}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 bg-orange-100 text-[#FF6B35] rounded-full text-xs font-medium">
                  {story.period}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                  {story.revenue}
                </span>
              </div>

              {/* Comment */}
              <p className="text-gray-600 text-sm leading-relaxed">
                &ldquo;{story.comment}&rdquo;
              </p>

              {/* Rating */}
              <div className="mt-4 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Banner */}
        <div className="section-fade-in bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">300+</div>
              <div className="text-gray-400 text-sm">성공 파트너</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">95%</div>
              <div className="text-gray-400 text-sm">만족도</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">2,100만</div>
              <div className="text-gray-400 text-sm">평균 월매출</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">50+</div>
              <div className="text-gray-400 text-sm">다양한 메뉴</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 section-fade-in">
          <p className="text-gray-600 mb-4">
            다음 성공 스토리의 주인공이 되어보세요
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="cta-button px-8 py-4 rounded-full text-white text-lg font-semibold"
          >
            무료 상담 신청하기
          </button>
        </div>
      </div>
    </section>
  );
}
