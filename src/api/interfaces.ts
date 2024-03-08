export interface IDriverAction {
  driverId: string;
  lat?: string;
  lng?: string;
}

export interface IStartDuty extends IDriverAction {
  start: Date;
}

export interface IStopDuty extends IDriverAction {
  end: Date;
}

export interface IStopCurrDuty extends IDriverAction {
  end: Date;
  perks?: number[];
}

export interface IAddDriverData {
  name: string;
  empId: string;
  profile: File | undefined;
  phone: string;
  departMentId: string | undefined;
}

// app-user

export interface IAddAppUser {
  email: string;
  password: string;
  phone: string;
}

export interface IUpdateAppUser {
  id: string;
  email?: string;
  phone?: string;
  isActive?: boolean;
  role?: string;
  profileId?: string;
  vendorId?: string;
  name?: string;
}

// Transaction interface

export interface GetAllTransaction {
  startDate: string | Date;
  endDate: string | Date;
  page: number;
  limit: number;
}
