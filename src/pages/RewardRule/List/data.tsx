import { useState } from "react";
import { SimpleSwitchToggle } from "../../../generics";
import RewardRuleService from "../../../api/reward";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

export const RewardRuleTableHeader = [
  {
    title: "S. no",
    key: "sno",
    type: "sno",
  },
  {
    title: "Title",
    key: "title",
    type: "description",
  },
  {
    title: "Type",
    key: "type",
    type: "string",
  },
  {
    title: "Description",
    key: "description",
    type: "description",
  },
  {
    title: "Event",
    key: "event",
    type: "string",
    level2: {
      key: "AppEvents",
    },
  },
  // {
  //   title: "STATUS",
  //   key: "status",
  //   type: "string",
  // },
  {
    title: "STATUS",
    key: "status",
    type: "component",
    component: (props: any) => <HandleStatus {...props} />,
  },
  // {
  //   title: "Actions",
  //   key: "actions",
  //   type: "component",
  //   component: (props: any) => <SimpleDropDown {...props} />,
  // },
];

function HandleStatus(props: any) {
  const [enabled, setEnabled] = useState<boolean>(props?.status === "ACTIVE");
  interface Payload {
    id: number;
    status: string;
  }
  const toggleStatusMutation = useMutation<any, Error, Payload>(
    (payload: Payload) =>
      RewardRuleService.toggleRewardRuleStatus(payload.id, payload.status),
    {
      onError: (error: any) => {
        console.error("Error toggling reward rule status:", error);
        // Revert the switch state on error
        setEnabled(!enabled);
        toast.error("something went wrong on update rule");

        // Optionally, show an error message or handle the error in another way
        // For example, using a toast notification library
        // toast.error('Failed to toggle reward rule status');
      },
    }
  );

  const handleSwitchChange = async (value: boolean) => {
    setEnabled(value);
    await toggleStatusMutation.mutateAsync({
      id: props.id,
      status: value ? "ACTIVE" : "INACTIVE",
    });
  };
  return <SimpleSwitchToggle enabled={enabled} onChange={handleSwitchChange} />;
}
