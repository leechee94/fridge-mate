import { useState, useMemo } from 'react';
import { Food, CATEGORIES, CATEGORY_ICONS } from '../types/food';
import { mockFoods } from '../data/mock';
import FoodCard from '../components/FoodCard';

interface MainPageProps {
  onAdd: () => void;
}

export default function MainPage({ onAdd }: MainPageProps) {
  const [foods, setFoods] = useState<Food[]>(mockFoods);
  const [filter, setFilter] = useState<string>('전체');
  const [sortBy, setSortBy] = useState<string>('expiry');

  const filtered = useMemo(() => {
    let list = filter === '전체' ? foods : foods.filter((f) => f.category === filter);
    if (sortBy === 'expiry') {
      return [...list].sort(
        (a, b) => new Date(a.expires_at).getTime() - new Date(b.expires_at).getTime()
      );
    }
    return [...list].sort(
      (a, b) => new Date(a.added_at).getTime() - new Date(b.added_at).getTime()
    );
  }, [foods, filter, sortBy]);

  const handleDelete = (id: string) => {
    setFoods((prev) => prev.filter((f) => f.id !== id));
  };

  // 통계
  const totalCount = foods.length;
  const expiringSoon = foods.filter((f) => {
    const diff = Math.ceil(
      (new Date(f.expires_at).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    return diff >= 0 && diff <= 3;
  }).length;
  const expired = foods.filter((f) => {
    const diff = Math.ceil(
      (new Date(f.expires_at).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    return diff < 0;
  }).length;

  return (
    <div className="min-h-dvh bg-gray-50 flex flex-col">
      {/* 상단 헤더 */}
      <header className="bg-white px-5 pt-12 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">🧊 우리집 냉장고</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              {new Date().toLocaleDateString('ko-KR')}
            </p>
          </div>
          <button className="text-gray-400 text-xl">👤</button>
        </div>
      </header>

      {/* 통계 요약 */}
      <div className="flex gap-2 px-5 py-3 bg-white border-b border-gray-50">
        <div className="flex-1 bg-blue-50 rounded-xl px-3 py-2 text-center">
          <div className="text-lg font-bold text-blue-600">{totalCount}</div>
          <div className="text-xs text-blue-400">전체</div>
        </div>
        <div className="flex-1 bg-yellow-50 rounded-xl px-3 py-2 text-center">
          <div className="text-lg font-bold text-yellow-600">{expiringSoon}</div>
          <div className="text-xs text-yellow-400">임박</div>
        </div>
        <div className="flex-1 bg-red-50 rounded-xl px-3 py-2 text-center">
          <div className="text-lg font-bold text-red-600">{expired}</div>
          <div className="text-xs text-red-400">기한초과</div>
        </div>
      </div>

      {/* 필터 탭 */}
      <div className="flex gap-2 px-5 py-3 overflow-x-auto bg-white border-b border-gray-50">
        {['전체', ...CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filter === cat
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {CATEGORY_ICONS[cat] || ''} {cat}
          </button>
        ))}
      </div>

      {/* 식품 목록 */}
      <div className="flex-1 px-5 py-4 space-y-2.5 overflow-y-auto pb-24">
        {filtered.length === 0 ? (
          <div className="text-center text-gray-400 pt-10">
            <div className="text-4xl mb-2">🧊</div>
            <p className="text-sm">냉장고가 비었어요</p>
            <p className="text-xs">식품을 추가해보세요</p>
          </div>
        ) : (
          filtered.map((food) => <FoodCard key={food.id} food={food} onDelete={handleDelete} />)
        )}
      </div>

      {/* 하단 추가 버튼 */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center">
        <button
          onClick={onAdd}
          className="bg-blue-500 text-white w-14 h-14 rounded-full text-2xl shadow-lg shadow-blue-200 hover:bg-blue-600 active:bg-blue-700 transition-colors"
        >
          +
        </button>
      </div>

      {/* 하단 네비 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-5 py-2">
        <div className="flex justify-around text-center">
          <div className="flex flex-col items-center text-blue-500">
            <span className="text-lg">🏠</span>
            <span className="text-[10px]">홈</span>
          </div>
          <div className="flex flex-col items-center text-gray-300">
            <span className="text-lg">📋</span>
            <span className="text-[10px]">장보기</span>
          </div>
          <div className="flex flex-col items-center text-gray-300">
            <span className="text-lg">⚙️</span>
            <span className="text-[10px]">설정</span>
          </div>
        </div>
      </div>
    </div>
  );
}
