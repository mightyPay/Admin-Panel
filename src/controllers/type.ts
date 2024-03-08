export interface ICommon {
  row: any;
  onClick: () => void;
  id: string;
}

export interface IQrControl {
  value: string;
  onClick: () => void;
}

export interface IEditDriverControl extends ICommon {}

export interface IEditControl extends ICommon {
  completed: () => void;
}

export interface IIDeleteControl extends ICommon {
  service: string;
}

export interface IAppUserActiveToggleControl extends ICommon {}

export interface IDriverReportControl extends ICommon {}
