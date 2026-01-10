'use client';

import { useEffect, useRef } from 'react';

const problems = [
  {
    icon: '🏠',
    title: '임대료',
    description: '매달 나가는 높은 임대료 부담',
    color: 'bg-red-100',
  },
  {
    icon: '🔧',
    title: '유지비',
    description: '전기, 가스, 수도 등 각종 유지비용',
    color: 'bg-orange-100',
  },
  {
    icon: '🪑',
    title: '인테리어',
    description: '수천만원의 인테리어 비용',
    color: 'bg-yellow-100',
  },
  {
    icon: '📦',
    title: '유통마진',
    description: '식자재 유통 과정의 마진',
    color: 'bg-lime-100',
  },
  {
    icon: '🍽️',
    title: '매장집기',
    description: '테이블, 의자, 주방기기 구입',
    color: 'bg-green-100',
  },
  {
    icon: '📉',
    title: '적은 수익률',
    description: '높은 고정비로 인한 낮은 마진',
    color: 'bg-teal-100',
  },
];

export default function ProblemSection() {
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
      id="problem"
      ref={sectionRef}
      className="py-20 md:py-32 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 section-fade-in">
          <span className="inline-block px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm font-medium mb-4">
            창업의 현실
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            자본 없이 창업하기 힘든 세상!<br />
            <span className="text-red-500">진입부터가 어렵습니다</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            일반적인 프랜차이즈를 시작하거나 추가하기 위해서는
            수많은 비용이 발생합니다.
          </p>
        </div>

        {/* Problem Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12 section-fade-in">
          {problems.map((problem, index) => (
            <div
              key={index}
              className={`card-hover p-6 rounded-2xl ${problem.color} text-center`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl mb-3">{problem.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {problem.title}
              </h3>
              <p className="text-sm text-gray-600">{problem.description}</p>
            </div>
          ))}
        </div>

        {/* Visual Comparison */}
        <div className="section-fade-in bg-white rounded-3xl p-8 md:p-12 shadow-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Traditional Franchise */}
            <div className="text-center p-6 bg-red-50 rounded-2xl">
              <div className="text-5xl mb-4">😰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                일반 프랜차이즈 창업
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-white rounded-lg p-3">
                  <span className="text-gray-600">초기 투자금</span>
                  <span className="font-bold text-red-500">5,000만원 ~</span>
                </div>
                <div className="flex items-center justify-between bg-white rounded-lg p-3">
                  <span className="text-gray-600">월 고정비</span>
                  <span className="font-bold text-red-500">500만원 ~</span>
                </div>
                <div className="flex items-center justify-between bg-white rounded-lg p-3">
                  <span className="text-gray-600">메뉴 한정</span>
                  <span className="font-bold text-red-500">단일 브랜드</span>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
              <div className="text-4xl">→</div>
            </div>

            {/* Fooddeuk */}
            <div className="text-center p-6 bg-green-50 rounded-2xl">
              <div className="text-5xl mb-4">😊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                푸드득 배달 창업
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-white rounded-lg p-3">
                  <span className="text-gray-600">초기 투자금</span>
                  <span className="font-bold text-green-500">100만원 ~</span>
                </div>
                <div className="flex items-center justify-between bg-white rounded-lg p-3">
                  <span className="text-gray-600">월 고정비</span>
                  <span className="font-bold text-green-500">100만원 ~</span>
                </div>
                <div className="flex items-center justify-between bg-white rounded-lg p-3">
                  <span className="text-gray-600">메뉴 확장</span>
                  <span className="font-bold text-green-500">다중 브랜드</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 section-fade-in">
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="cta-button px-8 py-4 rounded-full text-white text-lg font-semibold"
          >
            부담 없이 시작하기
          </button>
        </div>
      </div>
    </section>
  );
}
