import React, { useEffect, useRef, useState } from "react";
import { TbCloudUpload } from "react-icons/tb";
import clsxm from "../../utils/clsxm";

function MultipleFileUpload({ updateFiles, uploadedFiles }: any) {
  const [files, setFiles] = useState<File[] | undefined>(undefined);
  const inputElement = useRef<HTMLInputElement>(null);
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const fileList: FileList = e.dataTransfer.files;

    console.log(fileList);

    if (!fileList || !fileList.length) {
      setFiles(undefined);
      return;
    }

    fileListToFileArray(fileList).then((files: any) => {
      setFiles(files);
    });
  };

  const onClick = (): void => {
    if (inputElement.current) {
      inputElement.current.click();
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    console.log(fileList);
    if (!fileList || !fileList.length) {
      setFiles(undefined);
      return;
    }

    fileListToFileArray(fileList).then((files: any) => {
      setFiles(files);
    });
  };

  const fileListToFileArray = async (fileList: FileList) => {
    const files = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      files.push(fileList[i]);
    }
    return files;
  };

  useEffect(() => {
    if (updateFiles) {
      updateFiles(files);
    }
  }, [files]);

  useEffect(() => {
    if (!uploadedFiles) {
      setFiles(undefined);
    }
  }, [uploadedFiles]);

  return (
    <div
      onDrop={onDrop}
      onClick={onClick}
      onDragOver={(e) => e.preventDefault()}
      className={clsxm(
        "group bg-[#f1f3f8] relative rounded-md h-full w-full p-8 border border-gray-300 hover:border-rose-500 flex items-center justify-center cursor-pointer min-h-[180px]"
      )}
    >
      {files && files.length ? (
        <div className="flex items-center gap-4 flex-wrap">
          {files?.map((file: any, index: number) => (
            <span key={`${file.name}-${index}`}>{file.name}</span>
          ))}
        </div>
      ) : (
        <TbCloudUpload
          className={clsxm("text-gray-500 group-hover:text-rose-800")}
          size={60}
        />
      )}
      <input
        type="file"
        hidden
        ref={inputElement}
        onChange={onChange}
        multiple
      />
    </div>
  );
}

export default MultipleFileUpload;
