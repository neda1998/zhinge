/** @format */

import React from "react";

export interface LayoutsInterface {
  children?: React.ReactNode;
}
export interface AllRoutes {
  type: string,
  name: string,
  key: string,
  route: string,
  component?: React.ReactNode | any,
  children?: React.ReactNode | any
}

export interface SidebarContext {
  sidebarToggle: any;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

export interface IListChildren {
  title: string;
  name: string;
  id: number;
  children?: React.ReactNode;
}

export interface IList {
  title: string;
  name: string;
  id: number;
  value: boolean;
  children?: React.ReactNode;
}

export interface IInfoNav {
  title: string;
  path: string;
  id: number;
  icon?: any;
  colordicon?: any;
  soon?: boolean;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number | string;
  value: number;
}

export interface IPageList {
  index: number;
  components: React.FunctionComponent | any;
  name: string;
}

export interface ComponentsInterface {
  ref?: any;
}
