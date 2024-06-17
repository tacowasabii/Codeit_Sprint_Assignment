'use client';

import Image from 'next/image';
import { useGetItems } from '../api/items/useGetItems';
import TodoEmpty from './todoEmpty';
import DoneEmpty from './doneEmpty';
import InputBar from '@components/inputBar';
import Item from '@components/Item';

// Item 타입 정의
type Item = {
  id: number;
  name: string;
  isCompleted: boolean;
};

export default function Home() {
  // 할 일 목록 조회 훅
  const { data: itemsData, isLoading, refetch } = useGetItems();

  // 한 일 목록과 할 일 목록 분리
  const completedItems = itemsData?.filter((item: Item) => item.isCompleted);
  const uncompletedItems = itemsData?.filter((item: Item) => !item.isCompleted);

  return (
    <div className="flex justify-center py-6">
      <div className="flex flex-col items-center mobile:w-[343px] tablet:w-[696px] desktop:w-[1200px]">
        <InputBar refetchItems={refetch} />
        <div className="flex w-full mobile:mt-6 mobile:flex-col tablet:mt-10 tablet:flex-col desktop:mt-10 desktop:gap-6">
          <div className="w-full">
            <Image alt="todo" src="/todo.png" width={101} height={36} />
            {/* 데이터가 로딩 중이거나 할 일 목록이 비어있는지에 따라 TodoEmpty 컴포넌트 또는 할 일 목록을 보여줌 */}
            {isLoading || uncompletedItems.length == 0 ? (
              <TodoEmpty />
            ) : (
              <ul>
                {/* 할 일 목록을 보여주는 Item 컴포넌트*/}
                {uncompletedItems?.map((item: Item) => (
                  <Item
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    isCompleted={item.isCompleted}
                    refetchItems={refetch}
                  />
                ))}
              </ul>
            )}
          </div>
          <div className="w-full mobile:my-12 tablet:my-12">
            <Image alt="done" src="/done.png" width={101} height={36} />
            {/* 데이터가 로딩 중이거나 한 일 목록이 비어있는지에 따라 DoneEmpty 컴포넌트 또는 한 일 목록을 보여줌 */}
            {isLoading || completedItems.length == 0 ? (
              <DoneEmpty />
            ) : (
              <ul>
                {/* 한 일 목록을 보여주는 Item 컴포넌트*/}
                {completedItems?.map((item: Item) => (
                  <Item
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    isCompleted={item.isCompleted}
                    refetchItems={refetch}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
