import RNHTMLtoPDF from "react-native-html-to-pdf";
import Toast from "react-native-toast-message";
import RNFS from "react-native-fs";
import { Platform } from "react-native";
import { UserType } from "../interfaces/Types";


export const generateLedgerPDF = async (userInfo: any, item: any) => {
  let itemsHtml = "";
  item.forEach((item: any, index: any) => {
    itemsHtml += `
        <tr>
          <td>${item?.ledgerDate}</td>
          <td>${item?.ledgerName}</td>
          <td>${item.ledgerType}</td>
          <td>${item.ledgerCode}</td>
        </tr>
      `;
  });
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

export const distrbutarOrderFilter = (
  isSelectType: any,
  data: any[],
  portal: string
) => {
  if (isSelectType === "orderHistory.all") {
    return [];
  } else if (isSelectType === "orderHistory.approved") {
    const newData = data.filter(
      (item: any) =>
        (item?.status?.by_admin === "approved" &&
          item?.status?.by_aso === "approved" &&
          item?.status?.by_distributor === "approved") ||
        (item?.status?.by_admin === "approved" &&
          item?.status?.by_aso === "approved") ||
        (item?.status?.by_aso === "approved" &&
          item?.status?.by_distributor === "approved")
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
    const newData = data.filter((item: any) =>
      portal === UserType.DISTRIBUTOR
        ? item?.status?.by_distributor === "pending"
        : item?.status?.by_aso === "pending"
    );
    return newData;
  }
};

export const abbreviateNumber = (num: any) => {
  if (num >= 1e7) {
    return (num / 1e7).toFixed(2) + " Cr"; // Crore
  } else if (num >= 1e5) {
    return (num / 1e5).toFixed(2) + " Lakh"; // Lakh
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + "K"; // Thousand
  } else {
    return num?.toString(); // Less than a thousand
  }
};
