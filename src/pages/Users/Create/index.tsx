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
import UserService from "../../../api/users";

interface FormData {
  email: string;
  role: string;
  name?: string;
  phone?: string;
  password?: string;
  [key: string]: any; // Add an index signature
}

const initialData = {
  email: "",
  role: "",
  name: "",
  phone: "",
  password: "",
};

const REQUIRED_FIELD = ["email", "role"];

function CreateUser() {
  const [userRoles, setUserRoles] = useState<any[]>([]);
  const [amountTypes, setAmountTypes] = useState<any[]>([]);
  const [appEvents, setAppEvents] = useState<any[]>([]);
  const [errorFields, setErrorFields] = useState<string[]>([]);
  const [selectedAmountType, setSelectedAmountType] = useState<any>(undefined);

  const [formData, setFormData] = useState<FormData>(initialData);

  const rolesQuery = useQuery(
    ["get-roles"],
    async () => UserService.getUserRolesV1(),
    {
      onSuccess: (response) => {
        const { data, status } = response;
        if (status === 200) {
          setUserRoles(data.data);
        }
      },
      onError: (error) => {
        console.log({ error });
      },
    }
  );

  const { mutate, isLoading } = useMutation(
    "create-campaign",
    UserService.createUser,
    {
      onSuccess: (res) => {
        const { status, data, response } = res;

        if (response) {
          toast.error(response.data.message);
          return;
        }

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
      phone: formData.phone ? `+91${formData.phone}` : undefined,
    });
  };

  const validateForm = (field: string) => {
    if (!REQUIRED_FIELD.includes(field)) return false;

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
                  <label>
                    Role <span className="text-red-500">*</span>
                  </label>
                  <SelectInput
                    classNames={"py-1"}
                    value={formData.role}
                    onChange={onChange}
                    options={userRoles}
                    name={"role"}
                    required={true}
                  />
                </div>
                <div className="grid gap-y-4">
                  <label>
                    email <span className="text-red-500">*</span>
                  </label>
                  <PlainInputText
                    placeholder={""}
                    type={"email"}
                    classNames={clsxm(
                      "py-1 px-0"
                      // errorFields.includes("email") && "border-2"
                    )}
                    value={formData.email}
                    name="email"
                    onChange={onChange}
                    required={true}
                  />
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-x-4 gap-y-4">
                <div className="grid gap-y-4">
                  <label>Name</label>
                  <PlainInputText
                    placeholder={""}
                    type={"text"}
                    classNames={clsxm("py-1 px-0")}
                    value={formData.name}
                    name="name"
                    onChange={onChange}
                  />
                </div>
                <div className="grid gap-y-4">
                  <label>Phone</label>
                  <PlainInputText
                    type={"phone"}
                    classNames={clsxm(
                      "py-1 px-0"
                      // errorFields.includes("email") && "border-2"
                    )}
                    value={formData.phone}
                    name="phone"
                    onChange={onChange}
                    placeholder={""}
                  />
                </div>
              </div>
              <div className="grid gap-y-4">
                <label>Password</label>
                <PlainInputText
                  placeholder={""}
                  type={"password"}
                  classNames={clsxm("py-1 px-0")}
                  value={formData.password}
                  name="password"
                  onChange={onChange}
                  showPassword={true}
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

export default CreateUser;
