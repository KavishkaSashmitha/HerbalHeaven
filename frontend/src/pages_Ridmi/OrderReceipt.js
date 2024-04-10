import { useCallback } from "react";
import { Button } from "@material-tailwind/react";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function OrderReceipt(order) {
  const data = order.data;
  const generateReceipt = useCallback(() => {
    const doc = new jsPDF();
    const customerData = [
      [`Order ID: ${data?.orderId}`],
      [`Customer Name: ${data?.user}`],
      [`Shipping Address : ${data?.shippingAddress}`],
      [`Payment Status : ${data?.paymentStatus}`],
      [`Order Status : ${data?.orderStatus}`],
    ];

    const itemData = data?.items?.map((m) => [
      m.name,
      m.quantity,
      m.price,
      m.image,
    ]);

    // Add page number
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(
        `Page ${i} of ${totalPages}`,
        doc.internal.pageSize.width - 28,
        doc.internal.pageSize.height - 18
      );
    }

    // Add page border
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.rect(
        5,
        5,
        doc.internal.pageSize.width - 10,
        doc.internal.pageSize.height - 10,
        "S"
      );
    }

    // Add current time
    const now = new Date();
    const currentTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    doc.setFontSize(7);
    doc.text(`Receipt generated on: ${currentTime}`, 152, 10);

    // Add company logo
    const logoImg = new Image();
    logoImg.src = "/logo/logo.png";
    doc.addImage(logoImg, "PNG", 90, 14, 40, 40);

    // Add company name
    doc.setFontSize(25);
    doc.setFont("helvetica", "bold");
    // Print "Herbal Heaven" text
    doc.text("Herbal Heaven", 80, 20);

    // Add company address, email, and phone number
    doc.setFontSize(8);
    doc.text("Company Address:", 10, 50);
    doc.text("123 Main St, City, Country", 10, 55);
    doc.text("Email: info@herbalheaven.com", 10, 60);
    doc.text("Phone: +1234567890", 10, 65);

    // Sub total and Total
    doc.setFontSize(12);
    doc.text(
      `Subtotal: Rs.${data?.total.toFixed(2)}`,
      doc.internal.pageSize.width - 20,
      doc.internal.pageSize.height - 50,
      null,
      null,
      "right"
    );
    doc.text(
      `Discount: Rs.0.00`,
      doc.internal.pageSize.width - 20,
      doc.internal.pageSize.height - 40,
      null,
      null,
      "right"
    );
    doc.text(
      `Total: Rs.${data?.total.toFixed(2)}`,
      doc.internal.pageSize.width - 20,
      doc.internal.pageSize.height - 30,
      null,
      null,
      "right"
    );

    // Table 1
    doc.autoTable({
      head: [["Order Details"]],
      body: customerData.map((row) => [row[0]]),
      margin: { top: 90, right: 50, left: 50 },
      theme: "striped",
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: "bold",
        fontSize: 15,
        halign: "center",
        valign: "middle",
        lineWidth: 0.2,
        lineColor: [255, 255, 255],
        cellPadding: 2,
      },
      bodyStyles: {
        fontSize: 10,
        textColor: 50,
        fontStyle: "bold",
        fillColor: [238, 238, 238],
        halign: "center",
        valign: "middle",
        lineWidth: 0.2,
        lineColor: [255, 255, 255],
        cellPadding: 2,
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255],
      },
      styles: {
        font: "Helvetica",
      },
    });

    // Table 2
    doc.autoTable({
      head: [["Item", "QTY", "Price"]],
      body: itemData,
      margin: { top: 29, right: 10, left: 10 },
      theme: "striped",
      headStyles: {
        fillColor: [46, 204, 113],
        textColor: 255,
        fontStyle: "bold",
        fontSize: 14,
        halign: "center",
        valign: "middle",
        lineWidth: 0.2,
        lineColor: [255, 255, 255],
        cellPadding: 3,
      },
      bodyStyles: {
        fontSize: 10,
        textColor: 50,
        fontStyle: "normal",
        fillColor: [238, 238, 238],
        halign: "center",
        valign: "middle",
        lineWidth: 0.5,
        lineColor: [255, 255, 255],
        cellPadding: 3,
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255],
      },
      styles: {
        font: "Helvetica",
      },
      didDrawCell: (data) => {
        if (data.column.index === 0 && data.row.index >= 0) {
          const itemInfo = data.row.raw;
          const imageUrl = itemInfo[3];
          if (imageUrl) {
            const imgWidth = 10;
            const imgHeight = 10;
            const xOffset = 10;
            const yOffset = (data.cell.height - imgHeight) / 2;
            doc.addImage(
              imageUrl,
              "JPEG",
              data.cell.x + xOffset,
              data.cell.y + yOffset,
              imgWidth,
              imgHeight
            );
          }
        }
      },
    });

    // Save the document
    doc.save(`Receipt ${data?.orderId}.pdf`);
  }, [data]);

  return (
    <>
      <Button onClick={generateReceipt}>Download Receipt</Button>
    </>
  );
}
