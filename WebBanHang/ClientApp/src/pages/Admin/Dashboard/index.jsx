import React from "react";
import DashboardReportContainer from "../../../container/Admin/DashboardReportContainer"
import DashboardTableContainer from "../../../container/Admin/DashboardTableContainer"

export default function Dashboard() {
    return <>
        <div>
            <h2>Dashboard</h2>
        </div>
        <DashboardReportContainer />
        <div style={{marginTop: 30}}>
            <h2>Table</h2>
        </div>
        <DashboardTableContainer />
    </>;
}
