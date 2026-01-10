'use client';

import { useEffect, useRef } from 'react';

const menuCategories = [
  { icon: '🍗', name: '치킨' },
  { icon: '🍱', name: '한식' },
  { icon: '🍜', name: '중식' },
  { icon: '🍣', name: '일식' },
];

const benefits = [
  {
    number: '01',
    title: '다양한 메뉴 동시 운영',
    description:
      '한 점포에서 치킨, 한식, 중식, 일식 등 여러 메뉴를 동시에 운영할 수 있습니다.',
  },
  {
    number: '02',
    title: '밀키트로 간편한 조리',
    description:
      '반조리된 밀키트 제품으로 전문 요리사 없이도 맛있는 음식을 만들 수 있습니다.',
  },
  {
    number: '03',
    title: '재고 부담 최소화',
    description:
      '필요한 만큼만 주문하고, 신선한 재료로 고객 만족도를 높입니다.',
  },
];

export default function MenuSection() {
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
      id="menu"
      ref={sectionRef}
      className="py-20 md:py-32 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 section-fade-in">
          <span className="inline-block px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-medium mb-4">
            운영 방식
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            여러 메뉴를 한 점포에서<br />
            <span className="text-[#FF6B35]">동시에 운영!</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            푸드득은 메뉴 선택의 폭을 넓혀<br />
            다양한 소비를 이루어 낼 수 있습니다.
          </p>
        </div>

        {/* Menu Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto mb-16 section-fade-in">
          {menuCategories.map((category, index) => (
            <div
              key={index}
              className="card-hover bg-white p-4 md:p-6 rounded-2xl text-center shadow-sm"
            >
              <div className="text-4xl md:text-5xl mb-2">{category.icon}</div>
              <h3 className="font-bold text-gray-900">{category.name}</h3>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 section-fade-in">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-sm"
            >
              <div className="text-4xl font-bold text-orange-200 mb-4">
                {benefit.number}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="section-fade-in bg-white rounded-3xl p-8 md:p-12 shadow-sm">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            푸드득 운영 프로세스
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                📞
              </div>
              <h4 className="font-bold text-gray-900 mb-2">상담 신청</h4>
              <p className="text-sm text-gray-600">
                무료 상담으로<br />창업 문의
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                📍
              </div>
              <h4 className="font-bold text-gray-900 mb-2">상권 분석</h4>
              <p className="text-sm text-gray-600">
                전문가의<br />상권 분석
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                🏪
              </div>
              <h4 className="font-bold text-gray-900 mb-2">점포 오픈</h4>
              <p className="text-sm text-gray-600">
                빠른 세팅으로<br />점포 오픈
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                💵
              </div>
              <h4 className="font-bold text-gray-900 mb-2">수익 창출</h4>
              <p className="text-sm text-gray-600">
                안정적인<br />매출 발생
              </p>
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
            메뉴 구성 상담받기
          </button>
        </div>
      </div>
    </section>
  );
}
