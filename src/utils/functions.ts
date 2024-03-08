import { toast } from "react-toastify";

const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, "0");
};

const formatDate = (date: Date) => {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-");
};

const getCurrDate = () => {
  const date = new Date();
  return formatDate(date);
};

const reactQueryError = (error: any) => {
  if (error?.response.data) {
    toast.error(error.response.data.message);
    return;
  }

  toast.error(`Something went wrong!`);
};

const onImageError = (e: any) => {
  e.target.src =
    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80";
};

export { formatDate, getCurrDate, reactQueryError, onImageError };
