'use client'
// components/SomeComponent.tsx
import React from 'react';
import { useUserStore } from './useUserStore';

const SomeComponent: React.FC = () => {
  console.log('SomeComponent');
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>UserId: {user.id}</p>
      <p>Email: {user.email}</p>
      <p>Username: {user.name}</p>
    </div>
  );
};

export default SomeComponent;
