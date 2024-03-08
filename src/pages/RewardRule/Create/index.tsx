import React, { useEffect, useState } from "react";
import {
  Button,
  PlainInputText,
  SelectInput,
  TextArea,
} from "../../../components";
import { BoxContainer, PageContainer } from "../../../containers";
import RewardRuleService from "../../../api/reward";
import { useMutation, useQueries, useQuery } from "react-query";
import clsxm from "../../../utils/clsxm";
import { PageHeader } from "../../../pageComponents";
import { toast } from "react-toastify";

interface FormData {
  type: string;
  title: string;
  description: string;
  // startDate: string;
  // endDate: string;
  amountType: string;
  amount: undefined | string;
  percentage: undefined | string;
  event: string;
  [key: string]: any; // Add an index signature
}

const initialData = {
  type: "null",
  title: "",
  description: "",
  // startDate: "",
  // endDate: "",
  amountType: "FIXED",
  amount: "",
  percentage: "",
  event: "",
};

function RewardRuleCreate() {
  const [ruleTypes, setRuleTypes] = useState<string[]>([]);
  const [amountTypes, setAmountTypes] = useState<any[]>([]);
  const [appEvents, setAppEvents] = useState<any[]>([]);
  const [errorFields, setErrorFields] = useState<string[]>([]);
  const [selectedAmountType, setSelectedAmountType] = useState<any>(undefined);

  const [formData, setFormData] = useState<FormData>(initialData);

  const ruleTypeQuery = useQuery(
    ["rule-type"],
    RewardRuleService.getRewardRuleType,
    {
      onSuccess: (response) => {
        const { data, status } = response;

        if (status === 200) {
          setRuleTypes(data.data);
        }
      },
      onError: (error) => {
        console.log({ error });
      },
    }
  );

  const amountTypeQuery = useQuery(
    ["amount-type"],
    RewardRuleService.getRewardRuleAmountType,
    {
      onSuccess: (response) => {
        const { data, status } = response;

        if (status === 200) {
          setFormData((prev) => {
            return { ...prev, amountType: data.data.default };
          });

          setAmountTypes(data.data.types);
        }
      },
      onError: (error) => {
        console.log({ error });
      },
    }
  );

  const appEventQuery = useQuery(
    ["app-event"],
    () => RewardRuleService.getAppEvents(),
    {
      onSuccess: (response) => {
        const { data, status } = response;

        if (status === 200) {
          setAppEvents(data.data.appEvents);
        }
      },
      onError: (error) => {
        console.log({ error });
      },
    }
  );

  const { mutate, isLoading } = useMutation(
    "create-reward",
    RewardRuleService.createRewardRule,
    {
      onSuccess: (res) => {
        const { status, data } = res;
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
      event: parseInt(formData.event),
      amount: formData.amount ? Number(formData.amount) : undefined,
      percentage: formData.percentage ? Number(formData.percentage) : undefined,
    });
  };

  const validateForm = (field: string) => {
    const isExist = !formData[field];

    if (isExist && field === "amount") {
      return formData.amountType === "FIXED";
    }

    if (isExist && field === "percentage") {
      return formData.amountType === "PERCENT";
    }

    if (isExist && field === "event") {
      return formData.type === "EVENT";
    }

    return isExist || formData[field] === "null";
  };

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
                  <label>Title</label>
                  <PlainInputText
                    placeholder={"Title"}
                    type={"text"}
                    classNames={clsxm(
                      "py-1 px-0"
                      // errorFields.includes("title") && "border-2"
                    )}
                    value={formData.title}
                    name="title"
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
                    options={ruleTypes || []}
                    name={"type"}
                    required={true}
                  />
                </div>
              </div>

              {/* <div className="grid lg:grid-cols-2 gap-x-4 gap-y-4">
                <div className="grid gap-y-4">
                  <label>Start Date</label>
                  <PlainInputText
                    placeholder={"Start"}
                    type={"date"}
                    classNames={"py-1 px-0"}
                    value={formData.startDate}
                    name="startDate"
                    onChange={onChange}
                    required={true}
                  />
                </div>
                <div className="grid gap-y-4">
                  <label>End Date</label>
                  <PlainInputText
                    placeholder={"End"}
                    type={"date"}
                    classNames={"py-1 px-0"}
                    value={formData.endDate}
                    name="endDate"
                    onChange={onChange}
                    required={true}
                  />
                </div>
              </div> */}

              <div
                className={clsxm(
                  "grid gap-x-4 gap-y-4",
                  formData.amountType !== "null" && "lg:grid-cols-2"
                )}
              >
                <div className="grid gap-y-4">
                  <label>Amount Type</label>
                  <SelectInput
                    classNames={"py-1"}
                    value={formData.amountType}
                    onChange={onChange}
                    options={amountTypes || []}
                    name={"amountType"}
                    required={true}
                  />
                </div>
                {formData.amountType !== "null" ? (
                  <div className="grid gap-y-4">
                    <label>
                      {formData.amountType === "FIXED"
                        ? "Amount"
                        : formData.amountType === "PERCENT"
                        ? "Percentage"
                        : null}
                    </label>
                    <PlainInputText
                      placeholder={
                        formData.amountType === "FIXED"
                          ? "Amount"
                          : formData.amountType === "PERCENT"
                          ? "Percentage"
                          : ""
                      }
                      type={"text"}
                      classNames={"py-1 px-0"}
                      value={
                        formData.amountType === "FIXED"
                          ? formData.amount
                          : formData.amountType === "PERCENT"
                          ? formData.percentage
                          : ""
                      }
                      name={
                        formData.amountType === "FIXED"
                          ? "amount"
                          : formData.amountType === "PERCENT"
                          ? "percentage"
                          : undefined
                      }
                      onChange={onChange}
                      required={true}
                    />
                  </div>
                ) : null}
              </div>

              <div className="grid gap-y-4">
                <label>Description</label>
                <TextArea
                  rows={3}
                  placeholder={"Describe rule"}
                  classNames={"px-0 py-1"}
                  value={formData.description}
                  name="description"
                  onChange={onChange}
                  required={true}
                />
              </div>
              {formData.type === "EVENT" ? (
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
              ) : null}
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

export default RewardRuleCreate;
