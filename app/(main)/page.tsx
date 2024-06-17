'use client';

import Image from 'next/image';
import { useGetItems } from '../api/items/useGetItems';
import TodoEmpty from './todoEmpty';
import DoneEmpty from './doneEmpty';
import InputBar from '@components/inputBar';
import Item from '@components/Item';

type Item = {
  id: number;
  name: string;
  isCompleted: boolean;
};

export default function Home() {
  const { data: itemsData, isLoading, refetch } = useGetItems();

  const completedItems = itemsData?.filter((item: Item) => item.isCompleted);
  const uncompletedItems = itemsData?.filter((item: Item) => !item.isCompleted);

  return (
    <div className="flex justify-center py-6">
      <div className="flex flex-col items-center mobile:w-[343px] tablet:w-[696px] desktop:w-[1200px]">
        <InputBar refetchItems={refetch} />
        <div className="flex w-full mobile:mt-6 mobile:flex-col tablet:mt-10 tablet:flex-col desktop:mt-10 desktop:gap-6">
          <div className="w-full">
            <Image alt="todo" src="/todo.png" width={101} height={36} />
            {isLoading || uncompletedItems.length == 0 ? (
              <TodoEmpty />
            ) : (
              <ul>
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
            {isLoading || completedItems.length == 0 ? (
              <DoneEmpty />
            ) : (
              <ul>
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
