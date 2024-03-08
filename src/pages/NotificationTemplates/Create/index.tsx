import React, { useEffect, useState } from "react";
import {
  Button,
  PlainInputText,
  SelectInput,
  TextArea,
} from "../../../components";
import { BoxContainer, PageContainer } from "../../../containers";
import NotificationService from "../../../api/notification";
import RewardRuleService from "../../../api/reward";
import { useMutation, useQueries, useQuery } from "react-query";
import clsxm from "../../../utils/clsxm";
import { PageHeader } from "../../../pageComponents";
import { toast } from "react-toastify";

interface FormData {
  type: string;
  name: string;
  template: string;
  event: string;
  [key: string]: any; // Add an index signature
}

const initialData = {
  type: "null",
  name: "",
  template: "",
  event: "",
};

function TemplateCreate() {
  const [templateType, setTemplateType] = useState<string[]>([]);
  const [appEvents, setAppEvents] = useState<any[]>([]);
  const [errorFields, setErrorFields] = useState<string[]>([]);

  const [formData, setFormData] = useState<FormData>(initialData);

  useQuery(["template-type"], NotificationService.getMessageTemplateType, {
    onSuccess: (response) => {
      const { data, status } = response;

      if (status === 200) {
        setTemplateType(data.data);
      }
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  useQuery(["app-event"], () => RewardRuleService.getAppEvents(), {
    onSuccess: (response) => {
      const { data, status } = response;

      if (status === 200) {
        setAppEvents(data.data.appEvents);
      }
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  const { mutate, isLoading } = useMutation(
    "create-template",
    NotificationService.createMessageTemplate,
    {
      onSuccess: (res) => {
        const { status } = res;
        if (status === 201) {
          toast.success("Created successfully");
          setFormData(initialData);
        }
      },
      onError: (error) => {
        toast.error("something went wrong!");
        console.log({ error });
      },
    }
  );

  const onChange = (e: { target: { name: string; value: any } }) => {
    setErrorFields(errorFields.filter((field) => field !== e.target.name));
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const fields = Object.keys(formData);

    const errorFields = fields.filter(validateForm);

    if (errorFields.length) {
      console.log({ errorFields });
      setErrorFields(errorFields);
      return;
    }

    mutate({
      ...formData,
      eventId: parseInt(formData.event),
    });
  };

  const validateForm = (field: string) => {
    const isExist = !formData[field];

    if (isExist && field === "event") {
      return formData.type === "EVENT";
    }

    return isExist || formData[field] === "null";
  };

  console.log({ templateType });

  return (
    <PageContainer PageHeader={<PageHeader />}>
      <div className="grid gap-y-5">
        <BoxContainer classNames="shadow-md h-full">
          <div className="flex flex-col gap-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium border-l-4 border-rose-800 pl-4">
                Create
              </h2>
            </div>
            <form className="grid gap-y-6" onSubmit={onSubmit}>
              <div className="grid lg:grid-cols-2 gap-x-4 gap-y-4">
                <div className="grid gap-y-4">
                  <label>Name</label>
                  <PlainInputText
                    placeholder={"Name"}
                    type={"text"}
                    classNames={clsxm("py-1 px-0")}
                    value={formData.name}
                    name="name"
                    onChange={onChange}
                    required={true}
                  />
                </div>
                <div className="grid gap-y-4">
                  <label>Type</label>
                  <SelectInput
                    classNames={"py-1"}
                    value={formData.type}
                    onChange={onChange}
                    options={templateType || []}
                    name={"type"}
                    required={true}
                  />
                </div>
              </div>

              <div className="grid gap-y-4">
                <label>Template</label>
                <TextArea
                  rows={5}
                  placeholder={
                    formData.type === "EMAIL"
                      ? "<h1 style='color:red;'>Hi, {{name}} Good Evening</h1>"
                      : "e.g Hi, {{name}} how are you?"
                  }
                  classNames={"px-0 py-1"}
                  value={formData.template}
                  name="template"
                  onChange={onChange}
                  required={true}
                />
              </div>

              <div className="grid gap-y-4">
                <label>Select Event</label>
                <SelectInput
                  classNames={"py-1"}
                  value={formData.event}
                  onChange={onChange}
                  options={
                    appEvents.map((event) => {
                      return { ...event, name: event.event };
                    }) || []
                  }
                  name={"event"}
                  required={true}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  title={"Submit"}
                  loading={isLoading}
                  className="shadow-none h-12 w-28"
                  onClick={() => {}}
                />
              </div>
            </form>
          </div>
        </BoxContainer>
      </div>
    </PageContainer>
  );
}

export default TemplateCreate;
