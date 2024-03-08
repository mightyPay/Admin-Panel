import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import AuthService from "../../api/auth";
import { motion } from "framer-motion";
import { BsCheckLg } from "react-icons/bs";
import { LinkButton, SuspenseLoader } from "../../components";

const EmailVerification = () => {
  const { token } = useParams();

  const { isLoading } = useQuery(
    ["verifyEmail", token],
    async () => AuthService.emailVerification(token as string),
    {
      onSuccess: (response: any) => {
        console.log({ response });
      },
      onError: (err: any) => {
        console.error(err);
      },
      enabled: !!token,
    }
  );

  if (isLoading) {
    return <SuspenseLoader />;
  }

  return (
    <div className="flex items-center justify-center h-screen w-full flex-col gap-y-4">
      <motion.div
        className="w-28 h-28 rounded-full bg-green-500 shadow-md flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <BsCheckLg className="text-white text-6xl" />
      </motion.div>

      <LinkButton title={"Go home"} className="py-0 px-6" to="/" />
    </div>
  );
};

export default EmailVerification;
