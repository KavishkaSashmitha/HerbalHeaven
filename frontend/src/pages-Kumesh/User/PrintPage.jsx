import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { SidebarWithBurgerMenu } from '../../components/navBar';
function PrintPage() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Card Details Report",
    onAfterPrint: () => alert("Successfully Downloaded !"), //alret
  });
  return (
    <div>
        <SidebarWithBurgerMenu />
      <div className="btn-set-rwo">
        <button className="add-pay-btn" onClick={handlePrint}>
          Download Report
        </button>
      </div>
      <div ref={componentRef}>
        <h1>Print Here...</h1>
      </div>
    </div>
  );
}

export default PrintPage;
