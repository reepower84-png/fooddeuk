import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Brand */}
          <div>
            <Image
              src="/(최종) 푸드득_문서용.png"
              alt="푸드득"
              width={120}
              height={40}
              className="h-10 w-auto mb-2"
            />
            <p className="text-gray-400 text-sm mb-4">
              푸드로 득하다
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              쉽게 시작하고, 넓게 파는 새로운 창업 방식.<br />
              푸드득과 함께 성공적인 창업을 시작하세요.
            </p>
          </div>

          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">회사 정보</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <span className="text-gray-500">상호:</span> 제이코리아
              </li>
              <li>
                <span className="text-gray-500">대표:</span> 이주영
              </li>
              <li>
                <span className="text-gray-500">사업자등록번호:</span> 278-30-01540
              </li>
              <li>
                <span className="text-gray-500">주소:</span> 인천광역시 계양구 오조산로57번길 15, 7층 7106호
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-10 pt-8">
          <div className="flex justify-center items-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} 푸드득. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
