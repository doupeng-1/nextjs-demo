'use client';

import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 text-2xl font-bold"
        >
          ×
        </button>
        {isLogin ? (
          <LoginForm
            onToggleMode={() => setIsLogin(false)}
            onClose={onClose}
          />
        ) : (
          <RegisterForm
            onToggleMode={() => setIsLogin(true)}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}
