/** @format */

import { IInfoNav } from "../../../../@types/App/components.type";

export interface ITabbarsProps {
  tabList: IInfoNav[] | any;
  state: number;
  dispatch: React.Dispatch<React.SetStateAction<number>>;
  id?: number;
}
