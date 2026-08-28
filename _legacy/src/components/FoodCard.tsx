import { Food, CATEGORY_ICONS } from '../types/food';

interface FoodCardProps {
  food: Food;
  onDelete?: (id: string) => void;
}

function calcDaysLabel(dateStr: string): { label: string; color: string } {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 보관일수
  const added = new Date(dateStr);
  added.setHours(0, 0, 0, 0);
  const daysIn = Math.floor((today.getTime() - added.getTime()) / (1000 * 60 * 60 * 24));

  return { label: `+${daysIn}일`, color: 'text-gray-500' };
}

function calcExpiryLabel(dateStr: string): { label: string; color: string; bg: string } {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const expiry = new Date(dateStr);
  expiry.setHours(0, 0, 0, 0);
  const diff = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diff < 0) {
    return { label: `D${diff}`, color: 'text-white', bg: 'bg-red-500' };
  }
  if (diff === 0) {
    return { label: 'D-Day', color: 'text-white', bg: 'bg-red-500' };
  }
  if (diff <= 3) {
    return { label: `D-${diff}`, color: 'text-white', bg: 'bg-yellow-500' };
  }
  return { label: `D-${diff}`, color: 'text-green-800', bg: 'bg-green-100' };
}

export default function FoodCard({ food, onDelete }: FoodCardProps) {
  const daysLabel = calcDaysLabel(food.added_at);
  const expiry = calcExpiryLabel(food.expires_at);

  return (
    <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100">
      {/* 아이콘 */}
      <div className="text-2xl w-10 text-center">
        {CATEGORY_ICONS[food.category] || '📦'}
      </div>

      {/* 정보 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900 truncate">{food.name}</span>
          <span className="text-xs text-gray-400">{food.quantity}</span>
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-gray-400">{food.category}</span>
          <span className="text-xs text-gray-300">|</span>
          <span className={`text-xs ${daysLabel.color}`}>{daysLabel.label}</span>
        </div>
      </div>

      {/* 유통기한 뱃지 */}
      <div className="flex items-center gap-2">
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${expiry.bg} ${expiry.color}`}>
          {expiry.label}
        </span>
        {onDelete && (
          <button
            onClick={() => onDelete(food.id)}
            className="text-gray-300 hover:text-red-400 text-lg leading-none"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
