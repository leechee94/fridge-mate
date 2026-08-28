export interface Food {
  id: string;
  name: string;
  quantity: string;
  category: string;
  added_at: string; // ISO date string
  expires_at: string; // ISO date string
  notes?: string;
  user_id?: string;
}

export interface FoodInput {
  name: string;
  quantity: string;
  category: string;
  added_at: string;
  expires_at: string;
  notes?: string;
}

export const CATEGORIES = [
  '육류',
  '채소/과일',
  '유제품',
  '음료',
  '가공식품',
  '양념',
  '기타',
] as const;

export const CATEGORY_ICONS: Record<string, string> = {
  '육류': '🥩',
  '채소/과일': '🥬',
  '유제품': '🧀',
  '음료': '🥤',
  '가공식품': '🥫',
  '양념': '🧂',
  '기타': '📦',
};
