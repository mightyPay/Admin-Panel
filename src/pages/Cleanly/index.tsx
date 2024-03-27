import React, { useState } from "react";
import { Button } from "../../components";
import { BoxContainer } from "../../containers";
import Cleanly from "../../api/cleanly";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { SingleFileUpload } from "../../components";

const CleanlyDashboard = () => {
  const [iconFile, setIconFile] = useState<File | undefined>(undefined);
  const [serviceName, setServiceName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | undefined>(undefined);

  const { isLoading: isIconUploading, mutateAsync: createIcons } = useMutation(
    "createIcons",
    Cleanly.createIcons,
    {
      onSuccess: (res) => {

        if (res && res.status === "success") {
          toast.success("Icon uploaded successfully");
          setUploadedImageUrl(res.data.uri);
        }
      },
      onError: (err) => {
        console.error(err);
        toast.error("Error uploading icon");
      }
    }
  );

  const { isLoading: isAddingService, mutateAsync: addService } = useMutation(
    "addService",
    Cleanly.addService,
    {
      onSuccess: () => {
        toast.success("Service added successfully");
        setIconFile(undefined);
        setServiceName("");
        setCategory("");
        setAmount("");
        setUploadedImageUrl(undefined);
      },
      onError: (err) => {
        console.error(err);
        toast.error("Error adding service");
      }
    }
  );

  const handleServiceAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addService({
        name: serviceName,
        category,
        amount,
        icon: uploadedImageUrl
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleIconUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("icon upload called");

    if (!iconFile) {
      toast.error("Please select an icon to upload");
      return;
    }

    try {
      await createIcons({ image: iconFile });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid gap-y-5">
      <BoxContainer classNames="shadow-md h-full">
        <div className="flex flex-col gap-y-6">
          <form className="grid gap-y-6">
            <div className="grid gap-y-4">
              <label htmlFor="icon">Upload Icon</label>
              <SingleFileUpload
                setFile={setIconFile}
                file={iconFile}
              />
              <Button
                title="Upload Icon"
                loading={isIconUploading}
                className="shadow-none h-12 w-28"
                onClick={handleIconUpload}
              />
            </div>
            <div className="grid gap-y-4">
              <label htmlFor="serviceName">Service Name</label>
              <input
                type="text"
                id="serviceName"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                className="px-3 py-2 border rounded-md"
              />
            </div>
            <div className="grid gap-y-4">
              <label htmlFor="category">Service Category</label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-3 py-2 border rounded-md"
              />
            </div>
            <div className="grid gap-y-4">
              <label htmlFor="amount">Service Amount</label>
              <input
                type="text"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="px-3 py-2 border rounded-md"
              />
            </div>
          </form>
          {uploadedImageUrl && (
            <div className="mt-8">
              <h2 className="text-xl font-medium border-l-4 border-blue-800 pl-4 mb-4">
                Uploaded Image
              </h2>
              <div className="w-full flex justify-center">
                <img
                  src={uploadedImageUrl}
                  alt="Uploaded Icon"
                  className="max-w-full h-auto"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              title="Add Service"
              loading={isAddingService}
              className="shadow-none h-12 w-28"
              onClick={handleServiceAdd}
            />
          </div>
        </div>
      </BoxContainer>
    </div>
  );
};

export default CleanlyDashboard;
