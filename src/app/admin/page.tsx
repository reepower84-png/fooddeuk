'use client';

import { useState, useEffect, useCallback } from 'react';
import { InquiryStatus, statusLabels, statusColors } from '@/lib/types';

interface Inquiry {
  id: string;
  name: string;
  phone: string;
  message: string;
  status: InquiryStatus;
  created_at: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [fetchError, setFetchError] = useState('');

  const [storedPassword, setStoredPassword] = useState('');

  const fetchInquiries = useCallback(async (pwd: string) => {
    setIsLoading(true);
    setFetchError('');

    try {
      const response = await fetch('/api/admin/inquiries', {
        headers: {
          'x-admin-password': pwd,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          setIsAuthenticated(false);
          setStoredPassword('');
          return;
        }
        throw new Error('Failed to fetch');
      }

      const data = await response.json();
      setInquiries(data.inquiries);
    } catch {
      setFetchError('문의 목록을 가져오는 데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && storedPassword) {
      fetchInquiries(storedPassword);
    }
  }, [isAuthenticated, storedPassword, fetchInquiries]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError('');

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        setStoredPassword(password);
      } else {
        setAuthError(data.error || '인증에 실패했습니다.');
      }
    } catch {
      setAuthError('서버 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: InquiryStatus) => {
    try {
      const response = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': storedPassword,
        },
        body: JSON.stringify({ id, status }),
      });

      if (response.ok) {
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
        );
      }
    } catch (error) {
      console.error('Status update failed:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`/api/admin/inquiries?id=${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-password': storedPassword,
        },
      });

      if (response.ok) {
        setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      }
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Login Page
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              푸드득 관리자
            </h1>
            <p className="text-gray-600 text-sm">
              관리자 비밀번호를 입력해주세요.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none"
                placeholder="비밀번호 입력"
                required
              />
            </div>

            {authError && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#FF6B35] text-white rounded-xl font-semibold hover:bg-[#E55A2B] transition-colors disabled:opacity-50"
            >
              {isLoading ? '확인 중...' : '로그인'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">푸드득 관리자</h1>
            <p className="text-sm text-gray-500">상담 문의 관리</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => fetchInquiries(storedPassword)}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              새로고침
            </button>
            <button
              onClick={() => {
                setIsAuthenticated(false);
                setStoredPassword('');
                setPassword('');
              }}
              className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-gray-900">
              {inquiries.length}
            </div>
            <div className="text-sm text-gray-500">전체 문의</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-yellow-500">
              {inquiries.filter((i) => i.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-500">대기중</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-blue-500">
              {inquiries.filter((i) => i.status === 'contacted').length}
            </div>
            <div className="text-sm text-gray-500">연락완료</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-green-500">
              {inquiries.filter((i) => i.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-500">상담완료</div>
          </div>
        </div>

        {/* Error Message */}
        {fetchError && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
            {fetchError}
          </div>
        )}

        {/* Inquiries Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              문의 목록
            </h2>
          </div>

          {isLoading ? (
            <div className="p-8 text-center text-gray-500">
              로딩 중...
            </div>
          ) : inquiries.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              아직 접수된 문의가 없습니다.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      접수일시
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      이름
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      연락처
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      문의내용
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      상태
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      관리
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {inquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(inquiry.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {inquiry.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {inquiry.phone}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {inquiry.message || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={inquiry.status}
                          onChange={(e) =>
                            handleStatusChange(
                              inquiry.id,
                              e.target.value as InquiryStatus
                            )
                          }
                          className={`px-3 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${
                            statusColors[inquiry.status]
                          }`}
                        >
                          {Object.entries(statusLabels).map(([value, label]) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleDelete(inquiry.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
