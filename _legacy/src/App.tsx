import { useState, useCallback } from 'react';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import AddFoodPage from './pages/AddFoodPage';
import { FoodInput } from './types/food';

type Screen = 'login' | 'main' | 'add';

export default function App() {
  const [screen, setScreen] = useState<Screen>('login');

  const handleLogin = useCallback(() => {
    setScreen('main');
  }, []);

  const handleAdd = useCallback(() => {
    setScreen('add');
  }, []);

  const handleSave = useCallback((_food: FoodInput) => {
    // mock: 저장 후 목록으로
    setScreen('main');
  }, []);

  const handleCancel = useCallback(() => {
    setScreen('main');
  }, []);

  switch (screen) {
    case 'login':
      return <LoginPage onLogin={handleLogin} />;
    case 'add':
      return <AddFoodPage onSave={handleSave} onCancel={handleCancel} />;
    default:
      return <MainPage onAdd={handleAdd} />;
  }
}
