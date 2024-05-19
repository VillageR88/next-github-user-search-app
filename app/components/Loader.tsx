'use client';

import { useContext } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { DataContext } from '@/app/_providers/DataContext';

export default function Loader() {
  const { pending } = useContext(DataContext);
  if (!pending) return null;
  return (
    <RotatingLines
      visible={true}
      width="30"
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      strokeColor="#0079FF"
    />
  );
}
