'use client';

import { useEffect, useRef } from 'react';

const features = [
  {
    icon: '💰',
    title: '소자본 창업',
    description:
      '높은 임대료, 인테리어비 부담 없이 적은 자본으로 시작할 수 있습니다.',
  },
  {
    icon: '🚀',
    title: '빠른 시작',
    description:
      '반조리 밀키트로 복잡한 조리 과정 없이 바로 사업을 시작하세요.',
  },
  {
    icon: '📈',
    title: '높은 수익률',
    description:
      '낮은 고정비와 효율적인 운영으로 높은 마진을 확보할 수 있습니다.',
  },
  {
    icon: '🛵',
    title: '배달 전문',
    description:
      '배달 중심의 효율적인 운영으로 인건비를 최소화합니다.',
  },
];

export default function SolutionSection() {
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
      id="solution"
      ref={sectionRef}
      className="py-20 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 section-fade-in">
          <span className="inline-block px-4 py-2 bg-orange-100 text-[#FF6B35] rounded-full text-sm font-medium mb-4">
            푸드득 소개
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            배달 점포 창업<br />
            <span className="gradient-text">푸드득</span>은 소자본 창업이 가능한<br />
            배달 프랜차이즈 사업입니다
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            복잡한 창업 과정, 높은 초기 비용 걱정 없이<br />
            쉽고 빠르게 배달 사업을 시작하세요.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 section-fade-in">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-hover bg-gradient-to-br from-orange-50 to-white p-6 rounded-2xl border border-orange-100"
            >
              <div className="icon-box bg-orange-100 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Highlight Box */}
        <div className="section-fade-in bg-gradient-to-r from-[#FF6B35] to-[#FF8E53] rounded-3xl p-8 md:p-12 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                푸드득과 함께라면<br />
                창업이 쉬워집니다
              </h3>
              <p className="text-white/90 mb-6 leading-relaxed">
                전문 컨설턴트가 창업부터 운영까지 전 과정을 함께합니다.
                지역 상권 분석, 메뉴 구성, 배달앱 등록까지 모든 것을 도와드립니다.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-sm">✓</span>
                  <span>1:1 전담 컨설턴트 배정</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-sm">✓</span>
                  <span>무료 상권 분석 제공</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-sm">✓</span>
                  <span>배달앱 마케팅 지원</span>
                </li>
              </ul>
            </div>
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl p-8">
                <div className="text-6xl mb-4">🏪</div>
                <div className="text-xl font-bold">나만의 배달 점포</div>
                <div className="text-white/80 text-sm mt-2">최소 비용으로 시작하세요</div>
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
            className="px-8 py-4 rounded-full bg-gray-900 text-white text-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            창업 상담 받기
          </button>
        </div>
      </div>
    </section>
  );
}
