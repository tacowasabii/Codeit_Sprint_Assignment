import Image from 'next/image';
import { svgAddIcon, svgEditIcon2 } from '@styles/svg';

type ImageUploaderProps = {
  imageUrl: string;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ImageUploader = ({ imageUrl, onFileChange }: ImageUploaderProps) => (
  <div className="relative mr-6 flex h-[311px] w-full items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 desktop:w-[384px]">
    {imageUrl ? (
      <Image alt="uploaded-img" fill={true} src={imageUrl} />
    ) : (
      <Image alt="img" src="/imgPlaceholder.png" width={54} height={54} />
    )}
    {imageUrl ? (
      <label className="absolute bottom-4 right-4 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-2 border-slate-900 bg-slate-900/50">
        {svgEditIcon2}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFileChange}
        />
      </label>
    ) : (
      <label className="absolute bottom-4 right-4 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-slate-200">
        {svgAddIcon}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFileChange}
        />
      </label>
    )}
  </div>
);

export default ImageUploader;
