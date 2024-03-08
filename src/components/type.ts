export interface ITableHead {
  title: string;
  key: string;
  type: string;
}

export interface ITable {
  header: ITableHead[] | object;
  data: any[] | undefined;
  type: string;
  classNames: string;
  level: number;
  actions?: any;
  loading: boolean;
  currRow?: any;
}

export interface IShowSlide {
  isShow: boolean;
  type: string | undefined;
  title: string | undefined;
}

export interface IEditControlSlide extends IShowSlide {
  row: any;
}

export interface IAttendanceSheet {
  row: any;
  today: object;
  startOfMonthDay: any;
  lastDayCurrentMonth: any;
  firstDayCurrentMonth: any;
  currentMonth: any;
  setReport: (data: any) => void;
  updateDuty: (date: any, data: any) => void;
  startDuty: (date: any) => void;
}

export interface IEditControl {
  panelState: IEditControlSlide;
  setPanelState: (data: any) => void;
}

export interface IRightSlide {
  state: IShowSlide;
  children: JSX.Element;
  width: string;
  onClose: () => void;
}

export interface IModel extends IRightSlide {
  closeIcon?: boolean;
}

export interface IButtonWithRightIcon {
  title: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  onClick: () => void;
}

export interface ISingleFileUpload {
  setFile: (file: File) => void;
  file: File | undefined;
  url?: string;
}

export interface ITimePicker {
  value: Date | undefined;
  setValue: (value: Date | undefined) => void;
}
