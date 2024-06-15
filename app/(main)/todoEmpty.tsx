import Image from 'next/image';

export default function TodoEmpty() {
  return (
    <div className="flex w-full flex-col items-center">
      <Image
        className="mt-16 mobile:hidden"
        alt="todo_empty"
        src="/todo_empty.png"
        width={240}
        height={240}
      />
      <Image
        className="tablet:hidden desktop:hidden"
        alt="todo_empty_small"
        src="/todo_empty_small.png"
        width={120}
        height={120}
      />
      <div className="text-center font-bold text-slate-400 mobile:mt-4 tablet:mt-6 desktop:mt-6">
        할 일이 없어요.
        <br />
        TODO를 새롭게 추가해주세요!
      </div>
    </div>
  );
}
