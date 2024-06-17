import changeItemStatus from '@app/api/items/changeItemStatus';
import { svgCheckIcon } from '@styles/svg';
import Link from 'next/link';
import React from 'react';

type ItemProps = {
  id: number;
  name: string;
  isCompleted: boolean;
  refetchItems: () => void;
};

const Item = ({ id, name, isCompleted, refetchItems }: ItemProps) => {
  // 완료 상태 변경 함수
  const handleChangeItemStatus = async (e: React.MouseEvent) => {
    // 상태 변경 버튼을 눌렀을때 link 이동을 막기 위해 preventDefault 사용
    e.preventDefault();
    try {
      // 현재 상태의 반대 상태로 변경
      await changeItemStatus(id, { isCompleted: !isCompleted });
      // 할 일 목록 다시 불러오기
      refetchItems();
    } catch (error) {
      console.error('Error changing item status:', error);
    }
  };

  return (
    // 할 일 목록 항목
    // 누르면 할 일 상세 페이지로 이동
    <Link
      href={`/items/${id}`}
      className={`mt-4 flex h-[50px] w-full items-center rounded-[27px] border-2 border-slate-900 ${isCompleted ? 'bg-violet-100' : 'bg-white'}`}
    >
      {/*상태 변경 버튼
      완료 여부에 따라 스타일 변경*/}
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
    </Link>
  );
};

export default Item;
