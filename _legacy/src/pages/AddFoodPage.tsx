import { useState } from 'react';
import { FoodInput, CATEGORIES } from '../types/food';

interface AddFoodPageProps {
  onSave: (food: FoodInput) => void;
  onCancel: () => void;
}

export default function AddFoodPage({ onSave, onCancel }: AddFoodPageProps) {
  const today = new Date().toISOString().split('T')[0];
  const [name, setName] = useState('');
  const [category, setCategory] = useState('기타');
  const [quantity, setQuantity] = useState('1');
  const [addedAt, setAddedAt] = useState(today);
  const [expiresAt, setExpiresAt] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !expiresAt) return;
    onSave({ name, quantity, category, added_at: addedAt, expires_at: expiresAt, notes });
  };

  return (
    <div className="min-h-dvh bg-gray-50 flex flex-col">
      {/* 헤더 */}
      <header className="bg-white px-5 pt-12 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <button onClick={onCancel} className="text-gray-400 text-sm">
            취소
          </button>
          <h1 className="text-lg font-bold text-gray-900">식품 추가</h1>
          <button
            onClick={handleSubmit}
            disabled={!name.trim() || !expiresAt}
            className="text-blue-500 text-sm font-semibold disabled:text-gray-300"
          >
            저장
          </button>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="flex-1 px-5 py-5 space-y-4">
        {/* 이름 */}
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1 block">식품명</label>
          <input
            placeholder="예: 우유, 달걀, 삼겹살..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoFocus
          />
        </div>

        {/* 카테고리 */}
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1 block">카테고리</label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  category === cat
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 수량 */}
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1 block">수량</label>
          <input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* 넣은 날짜 */}
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1 block">넣은 날짜</label>
          <input
            type="date"
            value={addedAt}
            onChange={(e) => setAddedAt(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* 유통기한 */}
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1 block">유통기한</label>
          <input
            type="date"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            min={today}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* 메모 */}
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1 block">메모</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          />
        </div>
      </form>
    </div>
  );
}
