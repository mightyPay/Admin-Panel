import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { DriverService } from "../api";

const useDriverPage = () => {
  const queryClient = useQueryClient();

  const [started, setStarted] = useState<boolean>(false);
  const [ended, setEnded] = useState<boolean>(false);
  const [updated, setUpdated] = useState<boolean>(false);

  const startDuty = useMutation("startDuty", DriverService.startDuty, {
    onSuccess: (response: any) => {
      if (response.data) {
        toast.success("duty is start successfully");
        queryClient.invalidateQueries("drivers");
        setStarted(true);
      }
    },
    onError: (error: Error) => {
      toast.error("something went wrong!");
    },
  });

  const endDuty = useMutation("stopDuty", DriverService.endCurrDuty, {
    onSuccess: (response: any) => {
      if (response.data) {
        toast.success("duty stop successfully!");
        queryClient.invalidateQueries("drivers");
        setEnded(true);
      }
    },
    onError: (error: Error) => {
      toast.error("something went wrong!");
    },
  });

  const updateDuty = useMutation("updateDuty", DriverService.updateDuty, {
    onSuccess: (response: any) => {
      if (response.data) {
        toast.success("Duty Update successfully!");
        queryClient.invalidateQueries("drivers");
        setUpdated(true);
      }
    },
    onError: (error: any) => {
      toast.error("Something went wrong!");
    },
  });

  return {
    startDuty,
    endDuty,
    started,
    setStarted,
    setEnded,
    ended,
    updateDuty,
    updated,
  };
};

export default useDriverPage;
