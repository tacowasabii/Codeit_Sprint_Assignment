type MemoInputProps = {
  memo: string;
  onMemoChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

// 메모 입력 컴포넌트
const MemoInput = ({ memo, onMemoChange }: MemoInputProps) => (
  <div
    className="flex h-[311px] w-full flex-col items-center rounded-3xl px-4 py-6 mobile:mt-[15px] tablet:mt-6 desktop:w-[588px]"
    style={{ backgroundImage: 'url(/memo.png)' }}
  >
    <div className="font-extrabold text-amber-800">Memo</div>
    <textarea
      className="mt-4 flex h-full w-full text-center text-slate-800 outline-none"
      style={{
        backgroundImage: 'url(/memo.png)',
      }}
      value={memo}
      onChange={onMemoChange}
    />
  </div>
);

export default MemoInput;
