'use client';

import { useState, useEffect, useRef } from 'react';

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    let formatted = value;

    if (value.length > 3 && value.length <= 7) {
      formatted = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else if (value.length > 7) {
      formatted = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
    }

    setFormData((prev) => ({ ...prev, phone: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitResult({
          success: true,
          message: '상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.',
        });
        setFormData({ name: '', phone: '', message: '' });
      } else {
        setSubmitResult({
          success: false,
          message: data.error || '신청 중 오류가 발생했습니다. 다시 시도해주세요.',
        });
      }
    } catch {
      setSubmitResult({
        success: false,
        message: '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 md:py-32 bg-gradient-to-br from-orange-50 via-white to-orange-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 section-fade-in">
          <span className="inline-block px-4 py-2 bg-orange-100 text-[#FF6B35] rounded-full text-sm font-medium mb-4">
            상담 문의
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            지금 바로 <span className="gradient-text">무료 상담</span>을<br />
            신청하세요
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            창업에 관한 모든 궁금증, 전문 컨설턴트가 친절하게 답변해드립니다.
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-xl mx-auto section-fade-in">
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none transition-all"
                  placeholder="홍길동"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  연락처 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  required
                  maxLength={13}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none transition-all"
                  placeholder="010-1234-5678"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  상담 문의 내용
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none transition-all resize-none"
                  placeholder="궁금한 점이나 상담받고 싶은 내용을 자유롭게 작성해주세요."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full cta-button py-4 rounded-xl text-white text-lg font-semibold ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    신청 중...
                  </span>
                ) : (
                  '무료 상담 신청하기'
                )}
              </button>

              {/* KakaoTalk Button */}
              <a
                href="http://pf.kakao.com/_SxcxbBC/chat"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#FEE500] hover:bg-[#FDD835] text-[#181600] text-lg font-semibold transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 3C6.48 3 2 6.58 2 11c0 2.84 1.86 5.33 4.66 6.76l-1.18 4.32c-.1.36.31.65.62.45L11.4 19.4c.2.02.4.03.6.03 5.52 0 10-3.58 10-8s-4.48-8-10-8z" />
                </svg>
                카카오톡으로 상담하기
              </a>

              {/* Result Message */}
              {submitResult && (
                <div
                  className={`p-4 rounded-xl text-center ${
                    submitResult.success
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  {submitResult.message}
                </div>
              )}
            </form>

            {/* Privacy Notice */}
            <p className="mt-6 text-xs text-gray-500 text-center">
              입력하신 정보는 상담 목적으로만 사용되며,<br />
              개인정보 보호정책에 따라 안전하게 관리됩니다.
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-2xl mx-auto section-fade-in">
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
            <div className="text-3xl mb-2">📞</div>
            <h3 className="font-bold text-gray-900 mb-1">전화 상담</h3>
            <p className="text-gray-600 text-sm">평일 09:00 - 18:00</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
            <div className="text-3xl mb-2">💬</div>
            <h3 className="font-bold text-gray-900 mb-1">카카오톡</h3>
            <p className="text-gray-600 text-sm">실시간 상담 가능</p>
          </div>
        </div>
      </div>
    </section>
  );
}
