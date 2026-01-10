export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  message: string;
  status: 'pending' | 'contacted' | 'completed';
  createdAt: string;
}

export type InquiryStatus = Inquiry['status'];

export const statusLabels: Record<InquiryStatus, string> = {
  pending: '대기중',
  contacted: '연락완료',
  completed: '상담완료',
};

export const statusColors: Record<InquiryStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  contacted: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
};
