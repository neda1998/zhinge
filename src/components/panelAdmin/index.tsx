import React from "react";
import "./panelAdmin.css";

const PanelAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="panel-admin">{children}</div>;
};

export default PanelAdmin;
