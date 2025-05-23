// src/pages/Dashboard.jsx
import { useState } from "react";
//import { useQrCodes } from "../hooks/useQrCodes";
import Navbar from "./Dashboard/Navbar";
import Vertical from "./Dashboard/VerticalBar";
import ContentArea from "./Dashboard/ContentArea";

export default function Dashboard() {
  /*
  const { markers, loading, error } = useQrCodes();
  const [selected, setSelected]     = useState(null);*/

  const [menuVisible, setMenuVisible] = useState(true);

  const [activePage, setActivePage] = useState("home")

  return (
    <div>

      <Navbar></Navbar>
      <Vertical setMenuVisible={setMenuVisible} setActivePage={setActivePage}></Vertical>
      <ContentArea menuVisible={menuVisible} activePage={activePage}></ContentArea>
    </div>
  );
  
}
