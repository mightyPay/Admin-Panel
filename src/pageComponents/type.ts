import { IDatePicker } from "../HeaderTools/type";

export interface ICommonInterface {
  completed?: () => void;
  title: string;
}

export interface IAddDriver extends ICommonInterface {}

export interface IAddAppUser extends ICommonInterface {}

export interface IPageHeader {
  ToolBar?: JSX.Element;
  menus?: any[];
}

export interface IHistoryHeaderTools {
  datePicker?: IDatePicker;
}
