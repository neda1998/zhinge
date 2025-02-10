/** @format */

import React from "react";
import { TabPanelProps } from "../../../../@types/App/components.type";

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...others } = props;
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tab-${index}`}
      
      aria-labelledby={`simple-tab-${index}`}
      {...others}
    >
      {value === index && <div className='flex items-center'>{children}</div>}
    </div>
  );
}

export default CustomTabPanel;
