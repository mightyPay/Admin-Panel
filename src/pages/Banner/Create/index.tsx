import React, { useState } from "react";
import {
  Button,
  MultipleFileUpload,
  PlainInputText,
  SingleFileUpload,
} from "../../../components";
import { BoxContainer } from "../../../containers";
import { ImageCarousel } from "../../../pageComponents";
import BannerService from "../../../api/banner";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

function BannerCreate() {
  const [files, setFiles] = useState<File[] | undefined>(undefined);
  const [name, setNames] = useState<string>("");
  const { isLoading, mutateAsync } = useMutation(
    "createBanner",
    BannerService.createBanner,
    {
      onSuccess: (res: any) => {
        if (res.data.status === "success") {
          toast.success("created successfully");
          setNames("");
          setFiles(undefined);
        }
      },
      onError: (err: any) => {
        console.log({ err });
      },
    }
  );

  const onCreate = () => {
    if (!files?.length) {
      toast.error("First you need to upload some banners");
      return;
    }

    if (!name) {
      toast.error("Name is required");
      return;
    }

    mutateAsync({ name, images: files });
  };

  return (
    <div className="grid gap-y-5">
      <BoxContainer classNames="shadow-md h-full">
        <div className="flex flex-col gap-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-medium border-l-4 border-blue-800 pl-4">
              Banner Create
            </h2>
            <Button
              title={"Create"}
              loading={isLoading}
              className="shadow-none h-12 w-28"
              onClick={onCreate}
            />
          </div>

          <form className="grid gap-y-6">
            <div className="grid gap-y-4">
              <label htmlFor="">Upload images</label>
              <MultipleFileUpload
                uploadedFiles={files}
                updateFiles={setFiles}
              />
            </div>
            <div className="grid gap-y-4">
              <label>Banner Name</label>
              <PlainInputText
                placeholder={"Banner Name"}
                type={"text"}
                classNames={""}
                value={name}
                onChange={(e) => setNames(e.target.value)}
              />
            </div>
          </form>
        </div>
      </BoxContainer>
      {files && files.length ? (
        <ImageCarousel
          slides={files.map((file: File, index: number) => {
            return { uri: URL.createObjectURL(file), id: `${index}`, file };
          })}
          updateBannerImages={(images: any) => {
            setFiles(images.map((obj: any) => obj.file));
          }}
        />
      ) : null}
    </div>
  );
}

export default BannerCreate;
