'use client';

import uploadImage from '@app/api/image/uploadImage';
import changeItemStatus from '@app/api/items/changeItemStatus';
import deleteItem from '@app/api/items/deleteItem';
import { useGetItemDetail } from '@app/api/items/uesGetItemDetail';
import { svgCheckIcon, svgDeleteIcon, svgEditIcon } from '@styles/svg';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import MemoInput from './memoInput';
import ImageUploader from './ImageUploader';

export default function ItemDetailPage({ params }: { params: { id: number } }) {
  const router = useRouter();
  const ItemId = params.id;

  // 아이템 세부 정보 가져오기
  const { data: itemDetailData, refetch } = useGetItemDetail(ItemId);

  // 아이템의 이름, 메모, 완료 여부, 이미지 URL 상태 관리
  const [name, setName] = useState('');
  const [memo, setMemo] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  // 수정 전의 초기 상태 저장
  const [initialName, setInitialName] = useState('');
  const [initialMemo, setInitialMemo] = useState('');
  const [initialIsCompleted, setInitialIsCompleted] = useState(false);
  const [initialImageUrl, setInitialImageUrl] = useState('');

  // 아이템 세부 정보가 변경되면 상태 업데이트
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

  // 아이템 상태 변경 요청
  const handleChangeItemStatus = async () => {
    try {
      await changeItemStatus(ItemId, {
        name,
        // 초기에 데이터를 받을때 null로 받아오기 때문에 새 입력값 없이 다시 요청할때는 빈 문자열로 보내줘야함
        memo: memo || '',
        imageUrl: imageUrl || '',
        isCompleted,
      });
      // 수정 완료 후 홈으로 이동 및 데이터 다시 불러오기
      router.push('/');
      refetch();
    } catch (error) {
      console.error('Error changing item status:', error);
    }
  };

  // 아이템 삭제 요청
  const handleDeleteItem = async () => {
    try {
      await deleteItem(ItemId);
      // 삭제 완료 후 홈으로 이동
      router.push('/');
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // 이미지 업로드 함수
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // 파일이 있는지 확인
    const file = e.target.files?.[0];
    if (file) {
      try {
        // 이미지를 업로드 한 후에 응답으로 받은 이미지 URL을 상태에 저장
        const response = await uploadImage(file);
        setImageUrl(response.url);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      console.error('No file selected');
    }
  };

  // 초기 상태와 현재 상태 비교하여 하나라도 다르면 수정 완료 버튼 활성화
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
        {/*완료 여부 변경 버튼*/}
        <button
          className={`mr-4 flex h-8 w-8 items-center justify-center rounded-full ${isCompleted ? 'bg-violet-600' : 'border-2 border-slate-900 bg-[#FEFCE8]'}`}
          onClick={() => setIsCompleted(!isCompleted)}
        >
          {isCompleted ? svgCheckIcon : null}
        </button>
        {/*할 일 이름 입력*/}
        <input
          className="w-[200px] border-none text-center text-20 font-bold text-slate-900 underline outline-none"
          style={{ backgroundColor: 'transparent' }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-6 flex w-full mobile:flex-col tablet:flex-col">
        {/* 이미지 업로드, 메모 입력 컴포넌트 */}
        <ImageUploader imageUrl={imageUrl} onFileChange={handleFileChange} />
        <MemoInput memo={memo} onMemoChange={(e) => setMemo(e.target.value)} />
      </div>
      <div className="mt-6 flex w-full justify-center desktop:justify-end">
        <div className="relative mr-4 h-14 w-[168px] mobile:mr-[7px]">
          {/* 수정 완료 버튼, 수정사항이 있을때만 스타일 변경 및 상태 활성화 */}
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
          {/* 삭제 버튼 */}
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
