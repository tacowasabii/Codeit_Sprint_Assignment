export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full justify-center">
      <div className="min-h-[calc(100vh-60px)] bg-white mobile:w-[375px] tablet:w-[744px] desktop:w-[1200px]">
        {children}
      </div>
    </div>
  );
}
