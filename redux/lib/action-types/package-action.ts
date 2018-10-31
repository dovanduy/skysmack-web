import { Action } from "redux";

export interface PackageAction extends Action<string> {
  packagePath: string;
}