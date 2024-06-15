import changeItemStatus from '@app/api/items/changeItemStatus';
import { svgCheckIcon } from '@styles/svg';
import React from 'react';

type ItemProps = {
  id: number;
  name: string;
  isCompleted: boolean;
  refetchItems: () => void;
};

export default function Item({
  id,
  name,
  isCompleted,
  refetchItems,
}: ItemProps) {
  const handleChangeItemStatus = async () => {
    try {
      await changeItemStatus(id, { isCompleted: !isCompleted });
      refetchItems();
    } catch (error) {
      console.error('Error changing item status:', error);
    }
  };

  return (
    <div
      className={`mt-4 flex h-[50px] w-full items-center rounded-[27px] border-2 border-slate-900 ${isCompleted ? 'bg-violet-100' : 'bg-white'}`}
    >
      <button
        className={`ml-3 flex h-8 w-8 items-center justify-center rounded-full ${isCompleted ? 'bg-violet-600' : 'border-2 border-slate-900 bg-[#FEFCE8]'}`}
        onClick={handleChangeItemStatus}
      >
        {isCompleted ? svgCheckIcon : null}
      </button>
      <div
        className={`ml-4 text-slate-800 ${isCompleted ? 'line-through' : ''}`}
      >
        {name}
      </div>
    </div>
  );
}
