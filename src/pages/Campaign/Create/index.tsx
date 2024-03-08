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
import CampaignService from "../../../api/campaign";

interface FormData {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  rule: string;
  [key: string]: any; // Add an index signature
}

const initialData = {
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  rule: "",
};

function CreateCampaignPage() {
  const [rewardRules, setRewardRules] = useState<any[]>([]);
  const [amountTypes, setAmountTypes] = useState<any[]>([]);
  const [appEvents, setAppEvents] = useState<any[]>([]);
  const [errorFields, setErrorFields] = useState<string[]>([]);
  const [selectedAmountType, setSelectedAmountType] = useState<any>(undefined);

  const [formData, setFormData] = useState<FormData>(initialData);

  const ruleQuery = useQuery(
    ["get-rule"],
    async () => RewardRuleService.getRewardRules(),
    {
      onSuccess: (response) => {
        const { data, status } = response;
        if (status === 200) {
          setRewardRules(data.data.rewardRule);
        }
      },
      onError: (error) => {
        console.log({ error });
      },
    }
  );

  const { mutate, isLoading } = useMutation(
    "create-campaign",
    CampaignService.createCampaign,
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
      rules: [parseInt(formData.rule)],
    });
  };

  const validateForm = (field: string) => {
    const isExist = !formData[field];

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
                  <label>Rule</label>
                  <SelectInput
                    classNames={"py-1"}
                    value={formData.type}
                    onChange={onChange}
                    options={
                      rewardRules.map((rule) => {
                        return { ...rule, name: rule.title };
                      }) || []
                    }
                    name={"rule"}
                    required={true}
                  />
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-x-4 gap-y-4">
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

export default CreateCampaignPage;
