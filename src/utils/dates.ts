import moment from "moment";

export const humanizeDateFormate = (value: Date | string) => {
  const date1 = moment(value);
  const date2 = moment();
  return moment.duration(date1.diff(date2)).humanize();
};
