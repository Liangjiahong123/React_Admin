import React from "react";
import { PageContainer } from "@ant-design/pro-components";
import DemoPie1 from "./components/DemoPie1";
import DemoPie2 from "./components/DemoPie2";
import DemoPie3 from "./components/DemoPie3";
import DemoLineColumn from "./components/DemoLineColumn";
import DemoMap from "./components/DemoMap";

function Home() {
  return (
    <PageContainer ghost>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <DemoPie3 />
        <DemoPie1 />
        <DemoPie2 />
      </div>
      <DemoLineColumn />
      <DemoMap />
    </PageContainer>
  );
}

export default Home;
