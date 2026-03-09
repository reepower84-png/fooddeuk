'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const navItems = [
  { id: 'hero', label: '홈' },
  { id: 'problem', label: '창업의 어려움' },
  { id: 'solution', label: '푸드득 소개' },
  { id: 'menu', label: '운영 방식' },
  { id: 'success', label: '성공 사례' },
  { id: 'contact', label: '상담 문의' },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            <Image
              src="/(최종) 푸드득_문서용.png"
              alt="푸드득"
              width={120}
              height={40}
              className="h-8 md:h-10 w-auto"
              priority
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nav-link text-sm font-medium ${
                  activeSection === item.id
                    ? 'active text-[#FF6B35]'
                    : isScrolled
                    ? 'text-gray-700 hover:text-[#FF6B35]'
                    : 'text-gray-700 hover:text-[#FF6B35]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="cta-button px-5 py-2 rounded-full text-white text-sm font-medium"
            >
              무료 상담
            </button>
            <a
              href="https://naver.me/xnOaXeSF"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full border-2 border-[#FF6B35] text-[#FF6B35] text-sm font-medium hover:bg-[#FF6B35] hover:text-white transition-colors"
            >
              메뉴 보러가기
            </a>
            <a
              href="https://naver.me/5kPsUmab"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full border-2 border-[#FF6B35] text-[#FF6B35] text-sm font-medium hover:bg-[#FF6B35] hover:text-white transition-colors"
            >
              브랜드 보러가기
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className={`md:hidden flex flex-col justify-center items-center w-10 h-10 ${
              isMenuOpen ? 'hamburger-open' : ''
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴 열기"
          >
            <span className="hamburger-line w-6 h-0.5 bg-gray-700 mb-1.5"></span>
            <span className="hamburger-line w-6 h-0.5 bg-gray-700 mb-1.5"></span>
            <span className="hamburger-line w-6 h-0.5 bg-gray-700"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 space-y-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeSection === item.id
                  ? 'bg-orange-50 text-[#FF6B35]'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('contact')}
            className="w-full cta-button px-5 py-3 rounded-full text-white text-sm font-medium mt-4"
          >
            무료 상담 신청
          </button>
          <div className="flex gap-2 mt-2">
            <a
              href="https://naver.me/xnOaXeSF"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-3 py-3 rounded-full border-2 border-[#FF6B35] text-[#FF6B35] text-sm font-medium hover:bg-[#FF6B35] hover:text-white transition-colors"
            >
              메뉴 보러가기
            </a>
            <a
              href="https://naver.me/5kPsUmab"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-3 py-3 rounded-full border-2 border-[#FF6B35] text-[#FF6B35] text-sm font-medium hover:bg-[#FF6B35] hover:text-white transition-colors"
            >
              브랜드 보러가기
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
