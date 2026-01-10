'use client';

export default function HeroSection() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 pt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full mb-6">
            <span className="text-sm font-medium text-[#FF6B35]">
              소자본 배달 프랜차이즈
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="gradient-text">푸드득</span>은<br />
            <span className="text-[#FF6B35]">&apos;쉽게 시작하고, 넓게 파는&apos;</span><br />
            새로운 창업 방식입니다.
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            반조리 밀키트 제품으로 쉽고 빠르게 메뉴를 늘리고,<br className="hidden sm:block" />
            여러 브랜드를 한 점포에서 동시 운영하세요.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={scrollToContact}
              className="cta-button px-8 py-4 rounded-full text-white text-lg font-semibold w-full sm:w-auto"
            >
              무료 상담 신청하기
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('solution');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-full border-2 border-gray-300 text-gray-700 text-lg font-semibold hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors w-full sm:w-auto"
            >
              자세히 알아보기
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#FF6B35] mb-2">50+</div>
              <div className="text-sm md:text-base text-gray-600">다양한 메뉴</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#FF6B35] mb-2">70%</div>
              <div className="text-sm md:text-base text-gray-600">창업비용 절감</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#FF6B35] mb-2">300+</div>
              <div className="text-sm md:text-base text-gray-600">성공 파트너</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
