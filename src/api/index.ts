import AuthService from "./auth";
import DriverService from "./driver";
import PerkService from "./perk";
import DepartMentService from "./department";
import AppUserService from "./app-user";
import PayrollService from "./payroll";
import UserService from "./users";
import TransactionService from "./transaction";

const allService: { [x: string]: any } = {
  AuthService,
  DriverService,
  PerkService,
  DepartMentService,
  AppUserService,
  PayrollService,
};

export {
  AuthService,
  DriverService,
  PerkService,
  DepartMentService,
  AppUserService,
  PayrollService,
  allService,
  UserService,
  TransactionService,
};
