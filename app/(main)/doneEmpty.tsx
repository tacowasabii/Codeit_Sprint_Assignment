import Image from 'next/image';

export default function DoneEmpty() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="mt-16 flex h-[240px] items-center mobile:hidden">
        <Image
          alt="done_empty"
          src="/done_empty.png"
          width={240}
          height={240}
        />
      </div>
      <Image
        className="tablet:hidden desktop:hidden"
        alt="done_empty_small"
        src="/done_empty_small.png"
        width={120}
        height={120}
      />
      <div className="text-center font-bold text-slate-400 mobile:mt-4 tablet:mt-6 desktop:mt-6">
        아직 다 한 일이 없어요.
        <br />
        해야 할 일을 체크해보세요!
      </div>
    </div>
  );
}
