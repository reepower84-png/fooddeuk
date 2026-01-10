import { promises as fs } from 'fs';
import path from 'path';
import { Inquiry, InquiryStatus } from './types';

const DATA_FILE = path.join(process.cwd(), 'data', 'inquiries.json');

async function ensureDataFile(): Promise<void> {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));
  }
}

export async function getInquiries(): Promise<Inquiry[]> {
  await ensureDataFile();
  const data = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

export async function addInquiry(inquiry: Omit<Inquiry, 'id' | 'status' | 'createdAt'>): Promise<Inquiry> {
  const inquiries = await getInquiries();

  const newInquiry: Inquiry = {
    id: `inq_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    ...inquiry,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  inquiries.unshift(newInquiry);
  await fs.writeFile(DATA_FILE, JSON.stringify(inquiries, null, 2));

  return newInquiry;
}

export async function updateInquiryStatus(id: string, status: InquiryStatus): Promise<Inquiry | null> {
  const inquiries = await getInquiries();
  const index = inquiries.findIndex(inq => inq.id === id);

  if (index === -1) return null;

  inquiries[index].status = status;
  await fs.writeFile(DATA_FILE, JSON.stringify(inquiries, null, 2));

  return inquiries[index];
}

export async function deleteInquiry(id: string): Promise<boolean> {
  const inquiries = await getInquiries();
  const filtered = inquiries.filter(inq => inq.id !== id);

  if (filtered.length === inquiries.length) return false;

  await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2));
  return true;
}
