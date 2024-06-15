'use client';

import changeItemStatus from '@app/api/items/changeItemStatus';
import deleteItem from '@app/api/items/deleteItem';
import { useGetItemDetail } from '@app/api/items/uesGetItemDetail';
import {
  svgAddIcon,
  svgCheckIcon,
  svgDeleteIcon,
  svgEditIcon,
} from '@styles/svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ItemDetailPage({ params }: { params: { id: number } }) {
  const router = useRouter();
  const ItemId = params.id;
  const { data: itemDetailData, isLoading, refetch } = useGetItemDetail(ItemId);

  const name = itemDetailData?.name;
  const isCompleted = itemDetailData?.isCompleted;
  const memo = itemDetailData?.memo;
  const imgUrl = itemDetailData?.imgUrl;

  const handleChangeItemStatus = async () => {
    try {
      await changeItemStatus(ItemId, { isCompleted: !isCompleted });
      refetch();
    } catch (error) {
      console.error('Error changing item status:', error);
    }
  };

  const handleDeleteItem = async () => {
    try {
      await deleteItem(ItemId);
      router.push('/');
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="flex w-full flex-col items-center mobile:px-4 tablet:px-6 desktop:px-[102px]">
      <div
        className={`mt-6 flex h-16 w-full items-center justify-center rounded-3xl border-2 border-slate-900 ${isCompleted ? 'bg-violet-100' : 'bg-white'}`}
      >
        <button
          className={`mr-4 flex h-8 w-8 items-center justify-center rounded-full ${isCompleted ? 'bg-violet-600' : 'border-2 border-slate-900 bg-[#FEFCE8]'}`}
          onClick={handleChangeItemStatus}
        >
          {isCompleted ? svgCheckIcon : null}
        </button>
        <div className="text-20 font-bold text-slate-900 underline">{name}</div>
      </div>
      <div className="mt-6 flex w-full mobile:flex-col tablet:flex-col">
        <div className="bg-slate-50 relative mr-6 flex h-[311px] w-full items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 desktop:w-[384px]">
          <Image alt="img" src="/imgPlaceholder.png" width={54} height={54} />
          <div className="absolute bottom-4 right-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-200">
            {svgAddIcon}
          </div>
        </div>
        <div
          className="flex h-[311px] w-full flex-col items-center rounded-3xl mobile:mt-[15px] tablet:mt-6 desktop:w-[588px]"
          style={{ backgroundImage: 'url(/memo.png)' }}
        >
          <div className="mt-6 font-extrabold text-amber-800">Memo</div>
          <div className="text-slate-800">{memo}</div>
        </div>
      </div>
      <div className="mt-6 flex w-full justify-center desktop:justify-end">
        <div className="relative mr-4 h-14 w-[168px] cursor-pointer mobile:mr-[7px]">
          <div
            className={`relative z-10 flex h-[52px] w-[164px] items-center justify-center rounded-3xl border-2 border-slate-900 bg-slate-200`}
          >
            <div>{svgEditIcon}</div>
            <div className="ml-1">수정 완료</div>
          </div>
          <div className="absolute left-1 top-1 z-0 h-[52px] w-[164px] rounded-3xl border-2 border-slate-900 bg-slate-900" />
        </div>
        <div className="relative h-14 w-[168px] cursor-pointer">
          <button
            className={`relative z-10 flex h-[52px] w-[164px] items-center justify-center rounded-3xl border-2 border-slate-900 bg-rose-500`}
            onClick={handleDeleteItem}
          >
            <div>{svgDeleteIcon}</div>
            <div className="ml-1 text-white">삭제하기</div>
          </button>
          <div className="absolute left-1 top-1 z-0 h-[52px] w-[164px] rounded-3xl border-2 border-slate-900 bg-slate-900" />
        </div>
      </div>
    </div>
  );
}
