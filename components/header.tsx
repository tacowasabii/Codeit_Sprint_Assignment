import Image from 'next/image';

export default function Header() {
  return (
    <div className="flex h-[60px] items-center justify-center border-b-[1px] border-b-slate-200 bg-white">
      <div className="tablet:w-[696px] mobile:hidden desktop:w-[1200px]">
        <Image alt="doit" src="/doit.png" width={151} height={40} />
      </div>
      <div className="tablet:hidden mobile:w-[343px] desktop:hidden">
        <Image alt="doit-small" src="/doit-small.png" width={71} height={40} />
      </div>
    </div>
  );
}
