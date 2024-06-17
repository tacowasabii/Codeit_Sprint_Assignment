'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { svgPlusIcon } from '@styles/svg';
import addItem from '@app/api/items/addItems';
import { useState } from 'react';

// InputBar 컴포넌트의 props 타입 정의
type InputBarProp = {
  refetchItems: () => void;
};

const InputBar = ({ refetchItems }: InputBarProp) => {
  // react-hook-form 사용하여 폼 상태 관리
  const { register, watch, handleSubmit, setValue } = useForm<{
    inputField: string;
  }>();
  // 중복 제출 방지 위함
  const [isSubmitting, setIsSubmitting] = useState(false);
  // inputField 값 가져오기
  const inputValue = watch('inputField', '');

  // 할 일 추가 함수
  const handleAddItem = async (name: string) => {
    if (name.trim()) {
      setIsSubmitting(true); // 폼 제출 중 상태로 설정
      try {
        await addItem({ name: name.trim() });
        setValue('inputField', ''); // inputField 값 초기화
        refetchItems(); // 할 일 목록 다시 불러오기
      } catch (error) {
        console.error('Error adding item:', error);
      } finally {
        setIsSubmitting(false); // 폼 제출 완료 상태로 설정
      }
    }
  };

  // 폼 제출 핸들러
  const onSubmit: SubmitHandler<{ inputField: string }> = async (data) => {
    // 중복 제출 방지
    if (!isSubmitting) {
      await handleAddItem(data.inputField);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full justify-between"
    >
      <div className="relative h-14 mobile:w-[280px] tablet:w-[518px] desktop:w-[1016px]">
        {/* 입력 필드 */}
        <div className="group relative z-10 flex h-[52.5px] items-center justify-center rounded-3xl border-2 border-slate-900 bg-slate-100 mobile:w-[279px] tablet:w-[516px] desktop:w-[1012px]">
          <input
            {...register('inputField')}
            className="mx-6 w-full bg-slate-100 outline-none placeholder:text-slate-500"
            placeholder="할 일을 입력해주세요"
          />
        </div>
        <div className="absolute left-1 top-[3.5px] z-0 h-[52.5px] rounded-3xl border-2 border-slate-900 bg-slate-900 mobile:left-[1px] mobile:w-[279px] tablet:left-[2px] tablet:w-[516px] desktop:w-[1012px]" />
      </div>
      <div className="relative h-14 cursor-pointer mobile:w-14 tablet:w-[162px] desktop:w-[168px]">
        {/* 제출 버튼 
        inputValue에 값이 있을때만 스타일 변경하고 버튼 활성화*/}
        <button
          type="submit"
          className={`relative z-10 flex h-[52px] items-center justify-center rounded-3xl border-2 border-slate-900 ${
            inputValue.trim().length > 0 ? 'bg-violet-600' : 'bg-slate-100'
          } mobile:w-[55px] tablet:w-[158.5px] desktop:w-[164px]`}
          disabled={inputValue.trim().length === 0}
        >
          {svgPlusIcon}
          <div className="ml-1 mobile:hidden">추가하기</div>
        </button>
        <div className="absolute left-1 top-1 z-0 h-[52px] rounded-3xl border-2 border-slate-900 bg-slate-900 mobile:left-[1px] mobile:w-[55px] tablet:left-[3.5px] tablet:w-[158.5px] desktop:w-[164px]" />
      </div>
    </form>
  );
};

export default InputBar;
