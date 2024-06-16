'use client';

import uploadImage from '@app/api/image/uploadImage';
import changeItemStatus from '@app/api/items/changeItemStatus';
import deleteItem from '@app/api/items/deleteItem';
import { useGetItemDetail } from '@app/api/items/uesGetItemDetail';
import {
  svgAddIcon,
  svgCheckIcon,
  svgDeleteIcon,
  svgEditIcon,
  svgEditIcon2,
} from '@styles/svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ItemDetailPage({ params }: { params: { id: number } }) {
  const router = useRouter();
  const ItemId = params.id;
  const { data: itemDetailData, refetch } = useGetItemDetail(ItemId);

  const [name, setName] = useState('');
  const [memo, setMemo] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const [initialName, setInitialName] = useState('');
  const [initialMemo, setInitialMemo] = useState('');
  const [initialIsCompleted, setInitialIsCompleted] = useState(false);
  const [initialImageUrl, setInitialImageUrl] = useState('');

  useEffect(() => {
    if (itemDetailData) {
      setName(itemDetailData.name);
      setMemo(itemDetailData.memo);
      setImageUrl(itemDetailData.imageUrl);
      setIsCompleted(itemDetailData.isCompleted);

      setInitialName(itemDetailData.name);
      setInitialMemo(itemDetailData.memo);
      setInitialImageUrl(itemDetailData.imageUrl);
      setInitialIsCompleted(itemDetailData.isCompleted);
    }
  }, [itemDetailData]);

  const handleChangeItemStatus = async () => {
    try {
      await changeItemStatus(ItemId, {
        name,
        memo: memo || '',
        imageUrl: imageUrl || '',
        isCompleted,
      });
      router.push('/');
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      try {
        const response = await uploadImage(file);
        setImageUrl(response.url);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      console.error('No file selected');
    }
  };

  const isModified =
    name !== initialName ||
    memo !== initialMemo ||
    imageUrl !== initialImageUrl ||
    isCompleted !== initialIsCompleted;

  return (
    <div className="flex w-full flex-col items-center mobile:px-4 tablet:px-6 desktop:px-[102px]">
      <div
        className={`mt-6 flex h-16 w-full items-center justify-center rounded-3xl border-2 border-slate-900 ${isCompleted ? 'bg-violet-100' : 'bg-white'}`}
      >
        <button
          className={`mr-4 flex h-8 w-8 items-center justify-center rounded-full ${isCompleted ? 'bg-violet-600' : 'border-2 border-slate-900 bg-[#FEFCE8]'}`}
          onClick={() => setIsCompleted(!isCompleted)}
        >
          {isCompleted ? svgCheckIcon : null}
        </button>
        <input
          className="w-[200px] border-none text-center text-20 font-bold text-slate-900 underline outline-none"
          style={{ backgroundColor: 'transparent' }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-6 flex w-full mobile:flex-col tablet:flex-col">
        <div className="relative mr-6 flex h-[311px] w-full items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 desktop:w-[384px]">
          {imageUrl ? (
            <Image alt="uploaded-img" fill={true} src={imageUrl} />
          ) : (
            <Image alt="img" src="/imgPlaceholder.png" width={54} height={54} />
          )}
          {imageUrl ? (
            <label className="absolute bottom-4 right-4 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-2 border-slate-900 bg-slate-900/50">
              {svgEditIcon2}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          ) : (
            <label className="absolute bottom-4 right-4 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-slate-200">
              {svgAddIcon}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          )}
        </div>
        <div
          className="flex h-[311px] w-full flex-col items-center rounded-3xl px-4 py-6 mobile:mt-[15px] tablet:mt-6 desktop:w-[588px]"
          style={{ backgroundImage: 'url(/memo.png)' }}
        >
          <div className="font-extrabold text-amber-800">Memo</div>
          <textarea
            className="mt-4 flex h-full w-full text-center text-slate-800 outline-none"
            style={{
              backgroundImage: 'url(/memo.png)',
            }}
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-6 flex w-full justify-center desktop:justify-end">
        <div className="relative mr-4 h-14 w-[168px] mobile:mr-[7px]">
          <button
            className={`relative z-10 flex h-[52px] w-[164px] ${
              isModified ? 'bg-lime-300' : 'bg-slate-200'
            } cursor-pointer items-center justify-center rounded-3xl border-2 border-slate-900`}
            onClick={handleChangeItemStatus}
            disabled={!isModified}
          >
            <div>{svgEditIcon}</div>
            <div className="ml-1">수정 완료</div>
          </button>
          <div className="absolute left-1 top-1 z-0 h-[52px] w-[164px] rounded-3xl border-2 border-slate-900 bg-slate-900" />
        </div>
        <div className="relative h-14 w-[168px]">
          <button
            className={`relative z-10 flex h-[52px] w-[164px] cursor-pointer items-center justify-center rounded-3xl border-2 border-slate-900 bg-rose-500`}
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
