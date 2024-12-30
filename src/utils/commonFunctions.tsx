import moment from "moment";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import Toast from "react-native-toast-message";
import RNFS from "react-native-fs";
import { Platform } from "react-native";

export const generateInvoicePDF = async (
  userInfo: any,
  item: any,
  combinedResult: any
) => {
  let itemsHtml = "";
  combinedResult.forEach(
    (item: { name: any; quantity: any; amount: any }, index: any) => {
      itemsHtml += `
        <tr>
          <td>${index + 1}</td>
          <td>${item?.name}</td>
          <td>${item.quantity}</td>
          <td>${item.amount}</td>
        </tr>
      `;
    }
  );

  const htmlContent = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            .header {
              text-align: center;
              font-size: 20px;
              margin-bottom: 20px;
            }
            .invoice-info {
              margin-bottom: 20px;
            }
            .invoice-info div {
              margin: 5px 0;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            table, th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
            .total {
              text-align: right;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${userInfo?.company || ""}</h1>
            <p>${userInfo?.address || ""}</p>
            <h3>Invoice</h3>
            <p>Invoice No: ${item?.invoiceNumber}</p>
            <p>Balance Due: Rs. ${item?.totalAmount}</p>
          </div>
  
          <div class="invoice-info">
            <div><strong>Bill To:</strong></div>
            <div>${item?.customerNameOnBill}</div>
            <div>${item?.address},${item?.state},${item?.country}</div>
            <div>Invoice Date: ${moment(item?.invoiceDate).format(
              "DD MMM YYYY"
            )}</div>
            <div>Due Date: ${moment(item?.dueDate).format("DD MMM YYYY")}</div>
          </div>
  
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Product Description</th>
                <th>Weight (MT)</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
  
          <div class="total">
            <p>Sub Total: Rs.${item?.totalAmount}</p>
            <p>Total: Rs. ${item?.totalAmount}</p>
          </div>
        </body>
      </html>
    `;

  // Generate PDF
  try {
    const fileName = `invoice_${item?.invoiceNumber || "default"}`;
    const options = {
      html: htmlContent,
      fileName: fileName,
      directory: "Documents",
    };

    const file: any = await RNHTMLtoPDF.convert(options);

    const destinationPath =
    Platform.OS === "ios"
      ? `${RNFS.DocumentDirectoryPath}/${fileName}.pdf`
      : `${RNFS.DownloadDirectoryPath}/${fileName}.pdf`;

    await RNFS.moveFile(file.filePath, destinationPath);
    if (file.filePath) {
      Toast.show({
        type: "success",
        text1: "PDF successfully donwload",
      });
    }
  } catch (error) {
    console.log(error);
    Toast.show({
      type: "success",
      text1: "PDF Already Donwloaded",
    });
  }
};

export const orderFilter = (isSelectType: any, data: any[]) => {
  if (isSelectType === "orderHistory.all") {
    return [];
  } else if (isSelectType === "orderHistory.approved") {
    const newData = data.filter(
      (item: any) =>
        item?.status?.by_admin === "approved" &&
        item?.status?.by_aso === "approved" &&
        item?.status?.by_distributor === "approved"
    );
    return newData;
  } else if (isSelectType === "orderHistory.rejected") {
    const newData = data.filter(
      (item: any) =>
        item?.status?.by_admin === "declined" ||
        item?.status?.by_aso === "declined" ||
        item?.status?.by_distributor === "declined"
    );
    return newData;
  } else if (isSelectType === "orderHistory.dispatched") {
    const newData = data.filter(
      (item: any) =>
        item?.status?.by_admin === "dispatched" ||
        item?.status?.by_aso === "dispatched" ||
        item?.status?.by_distributor === "dispatched"
    );
    return newData;
  } else if (isSelectType === "orderHistory.pending") {
    const newData = data.filter(
      (item: any) =>
        item?.status?.by_admin === "pending" &&
        item?.status?.by_aso === "pending" &&
        item?.status?.by_distributor === "pending"
    );
    return newData;
  }
};

export const generateLedgerPDF = async(userInfo: any, item: any) => {
  let itemsHtml = "";
  item.forEach(
    (item: any, index: any) => {
      itemsHtml += `
        <tr>
          <td>${item?.ledgerDate}</td>
          <td>${item?.ledgerName}</td>
          <td>${item.ledgerType}</td>
          <td>${item.ledgerCode}</td>
        </tr>
      `;
    }
  );
  const htmlContent = `
  <html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ledger Account PDF</title>
  <style>
    body {
      font-family: Arial, sans-serif;
    }
    .pdf-container {
      width: 800px;
      margin: auto;
      padding: 20px;
      border: 1px solid #ccc;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th, td {
      border: 1px solid #ccc;
      text-align: left;
      padding: 8px;
    }
    th {
      background-color: #f2f2f2;
    }
  </style>
</head>
<body>
  <div id="pdf-content" class="pdf-container">
    <h1>${userInfo?.company || ""}</h1>
    <p>${userInfo?.address || ""}</p>
    // <p>GISTIN: 10AABCB7265J1ZV | CIN: U27310BR1987PTC002780</p>
    // <h3>Shivam Enterprises - Motipur Muz</h3>
    // <p>Ledger Account<br>1-Apr-24 to 2-Oct-24</p>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Particulars</th>
          <th>Vch Type</th>
          <th>Vch No.</th>
        </tr>
      </thead>
      <tbody>
       ${itemsHtml}
      </tbody>
    </table>
  </div>
</body>
</html>
`;
  // Generate PDF
  try {
    const fileName = `ledger_${Math.floor(Math.random() * 100) || "default"}`;
    const options = {
      html: htmlContent,
      fileName: fileName,
      directory: "Documents",
    };

    const file: any = await RNHTMLtoPDF.convert(options);

    const destinationPath =
  Platform.OS === "ios"
    ? `${RNFS.DocumentDirectoryPath}/${fileName}.pdf`
    : `${RNFS.DownloadDirectoryPath}/${fileName}.pdf`;

    await RNFS.moveFile(file.filePath, destinationPath);
    if (file.filePath) {
      Toast.show({
        type: "success",
        text1: "PDF successfully donwload",
      });
    }
  } catch (error) {
    console.log(error);
    Toast.show({
      type: "success",
      text1: "PDF Already Donwloaded",
    });
  }
};
