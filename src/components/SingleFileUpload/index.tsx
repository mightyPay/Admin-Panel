import React, { useEffect, useRef, useState } from "react";
import { BsFillCameraFill } from "react-icons/bs";
import { IoCloudUploadSharp } from "react-icons/io5";
import clsxm from "../../utils/clsxm";
import { onImageError } from "../../utils/functions";
import { ISingleFileUpload } from "../type";

const SingleFileUpload = ({ setFile, file, url }: ISingleFileUpload) => {
  const [showImage, setShowImage] = useState<boolean>(true);
  const inputElement = useRef<HTMLInputElement>(null);

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const fileList: FileList = e.dataTransfer.files;
    if (!fileList) return;

    setFile(fileList[0]);
    setShowImage(false);
  };

  const onClick = (): void => {
    if (inputElement.current) {
      inputElement.current.click();
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    setFile(fileList[0]);
    setShowImage(false);
  };

  useEffect(() => {
    if (url) setShowImage(true);
  }, [url]);

  return (
    <div
      onDrop={onDrop}
      onClick={onClick}
      onDragOver={(e) => e.preventDefault()}
      className={clsxm(
        "group bg-[#f1f3f8] relative rounded-md h-full w-full p-8 flex flex-col items-center justify-center cursor-pointer"
      )}
    >
      <IoCloudUploadSharp className="text-7xl text-gray-500" />
      <span>{file?.name}</span>
      <input type="file" hidden ref={inputElement} onChange={onChange} />
      {url && showImage && (
        <div className="absolute rounded-md overflow-hidden top-0 right-0 left-0 bottom-0 h-full w-full">
          <img
            className="h-full w-full"
            src={url}
            alt="upload-image"
            onError={onImageError}
          />
          <div className="absolute top-0 right-0 bottom-0 left-0 flex items-end justify-end px-3 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 h-full w-full">
            <BsFillCameraFill className="text-6xl text-gray-400" />
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleFileUpload;
