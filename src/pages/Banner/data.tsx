import { useState } from "react";
import { useMutation } from "react-query";
import { SimpleSwitchToggle } from "../../generics";
import BannerService from "../../api/banner";
import { toast } from "react-toastify";

export const BannerHeader = [
  {
    title: "S. no",
    key: "sno",
    type: "sno",
  },
  {
    title: "Name",
    key: "name",
    type: "string",
  },
  {
    title: "Created At",
    key: "createdAt",
    type: "date",
  },
  {
    title: "IsActive",
    key: "isActive",
    type: "component",
    component: (props: any) => <HandleStatus {...props} type="status" />,
  },
  {
    title: "Applied",
    key: "isSet",
    type: "component",
    component: (props: any) => <HandleStatus {...props} type="applied" />,
  },
];

// {
//         "id": "4626ec01-8dcb-4983-ac14-fe8d9500e196",
//         "name": "first",
//         "createdAt": "2023-02-28T11:47:51.331Z",
//         "updatedAt": "2023-02-28T11:47:51.331Z",
//         "isActive": true,
//         "isSet": false,
//         "_count": {
//           "images": 5
//         }
//       }

function HandleStatus(props: any) {
  const [enabled, setEnabled] = useState<boolean>(
    props?.type === "status"
      ? props?.isActive
      : props?.type === "applied"
      ? props?.isSet
      : false
  );
  interface Payload {
    isActive?: boolean;
    isSet?: boolean;
  }
  const toggleStatusMutation = useMutation<any, Error, Payload>(
    (payload: Payload) => BannerService.updateBanner(props.id, payload),
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
    const payload: { [x: string]: any } = {};

    if (props?.type === "status") {
      payload["isActive"] = value;
    }

    if (props?.type === "applied") {
      payload["isSet"] = value;
    }

    await toggleStatusMutation.mutateAsync(payload);
  };
  return <SimpleSwitchToggle enabled={enabled} onChange={handleSwitchChange} />;
}
