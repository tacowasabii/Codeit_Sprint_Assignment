'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { svgPlusIcon } from '@styles/svg';
import addItem from '@app/api/items/addItems';
import { useState } from 'react';

type InputBarProp = {
  refetchItems: () => void;
};

export default function InputBar({ refetchItems }: InputBarProp) {
  const { register, watch, handleSubmit, setValue } = useForm<{
    inputField: string;
  }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputValue = watch('inputField', '');

  const handleAddItem = async (name: string) => {
    if (name.trim()) {
      setIsSubmitting(true);
      try {
        await addItem({ name: name.trim() });
        setValue('inputField', '');
        refetchItems();
      } catch (error) {
        console.error('Error adding item:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const onSubmit: SubmitHandler<{ inputField: string }> = async (data) => {
    if (!isSubmitting) {
      await handleAddItem(data.inputField);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 flex w-full justify-between"
    >
      <div className="relative h-14 mobile:w-[280px] tablet:w-[518px] desktop:w-[1016px]">
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
        <button
          type="submit"
          className={`relative z-10 flex h-[52px] items-center justify-center rounded-3xl border-2 border-slate-900 ${inputValue.trim().length > 0 ? 'bg-violet-600' : 'bg-slate-100'} mobile:w-[55px] tablet:w-[158.5px] desktop:w-[164px]`}
          disabled={inputValue.trim().length === 0}
        >
          {svgPlusIcon}
          <div className="ml-1 mobile:hidden">추가하기</div>
        </button>
        <div className="absolute left-1 top-1 z-0 h-[52px] rounded-3xl border-2 border-slate-900 bg-slate-900 mobile:left-[1px] mobile:w-[55px] tablet:left-[3.5px] tablet:w-[158.5px] desktop:w-[164px]" />
      </div>
    </form>
  );
}
