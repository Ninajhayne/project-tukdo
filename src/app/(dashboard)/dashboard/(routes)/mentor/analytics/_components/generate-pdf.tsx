import { jsPDF } from "jspdf";
import "jspdf-autotable";
//import { autoTable } from 'jspdf-autotable';
//import 'jspdf-autotable/types';

import { format } from "date-fns";

declare module "jspdf" {
    interface jsPDF {
      autoTable: (options: any) => jsPDF;
    }
  }

interface Buyer {
    user: {
      name: string;
    };
    course: {
      title: string;
      price: number | null;
    };
    createdAt: Date;
  }

// define a generatePDF function that accepts a buyers argument
const generatePDF = (buyers: Buyer[]) => {
    const doc = new jsPDF();
    
    // define the columns we want and their titles
    const tableColumn = ["#", "Name", "Title", "Price", "Date of Purchase"];
    // define an empty array of rows
    const tableRows = [];
    // initialize jsPDF

    const data = buyers.map((buyer, index) => [
        index + 1, // Add 1 to start numbering from 1,
        buyer.user.name,
        buyer.course.title,
        buyer.course.price,
        format(new Date(buyer.createdAt), "yyyy-MM-dd"),
    ]);

    tableRows.push(data);

    doc.autoTable({ columns: tableColumn, body: data, startY: 20 });

    const currentDate = new Date();
    const dateStr = format(currentDate, "yyyyMMddHHmmss");

    // const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    
    doc.text("Total number of learners who purchase the course.", 14, 15);
    doc.save(`total_buyer_report_${dateStr}.pdf`);
};

export default generatePDF;
