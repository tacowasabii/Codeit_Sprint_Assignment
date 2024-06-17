import Image from 'next/image';
import Link from 'next/link';

// 헤더 컴포넌트
const Header = () => {
  return (
    <div className="flex h-[60px] items-center justify-center border-b-[1px] border-b-slate-200 bg-white">
      <div className="mobile:hidden tablet:w-[696px] desktop:w-[1200px]">
        <Link href="/">
          <Image alt="doit" src="/doit.png" width={151} height={40} />
        </Link>
      </div>
      <div className="mobile:w-[343px] tablet:hidden desktop:hidden">
        <Link href="/">
          <Image
            alt="doit-small"
            src="/doit-small.png"
            width={71}
            height={40}
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;
