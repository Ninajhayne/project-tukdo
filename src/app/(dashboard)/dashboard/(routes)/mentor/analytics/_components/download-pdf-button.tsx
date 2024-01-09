"use client";

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'

import { Button } from "@/components/ui/button";
import { Course, Profile, Purchase } from '@prisma/client';
import { formatDate } from '@/lib/utils';
import { format } from "date-fns";

interface DownloadPdfButtonProps {
	buyers: Purchase & {
		course: Course
		user: Profile
	}[],
	timeFrame: string;
	revenue: number;
	sales: number;
	tutor: {
		id: string;
		userId: string;
		name: string;
		imageUrl: string;
		email: string;
	  };
}

export const DownloadPdfButton = ({
	buyers,
	timeFrame,
	revenue,
	sales,
	tutor,
}: DownloadPdfButtonProps) => {
    const pdf = new jsPDF();

	const columns = ['#', 'Name', 'Title', 'Price', 'Date'];
	
	const totalBuyers = buyers.length;
	
	
	// Set font to bold
	pdf.setFont("", "bold");

	// Add bold text
	pdf.text("TUKDO", 92, 20);

    // Set font size for "Total Learner" line
	pdf.setFont("", "normal");
	pdf.setFontSize(14); // Set the default font size, adjust as needed
	pdf.text(`TOTAL LEARNER ENROLLED IN THE COURSE`, 15, 28);

    pdf.setFontSize(12); // Set the default font size, adjust as needed

    // Add total number of buyers to the line
	pdf.text(`Tutor Name: ${tutor.name}`, 15, 34);
    pdf.text(`Total Learner: ${totalBuyers}`, 15, 40);

    // Reset font size to default



    const buyersData = buyers.map((buyer: any, index) => {
		/*
        return [
            buyer.user.name,
            buyer.course.title,
            buyer.course.price,
            //buyer.course.rating
        ];
		*/
		// Truncate the name and title
        const truncatedName = buyer.user.name.substring(0, 30);
        const truncatedTitle = buyer.course.title.substring(0, 36);

        // Replace 0 price with "Free"
        const price = buyer.course.price === 0 ? 'Free' : buyer.course.price;
		const date = formatDate(buyer.createdAt);

        return [
			index + 1, // Add 1 to start numbering from 1,
            truncatedName,
            truncatedTitle,
            price,
			date,
        ];
    });

	// Add additional rows for timeFrame, revenue, and sales
    const additionalRows = [
        ['Time Frame:', timeFrame, '', ''],
        ['Revenue:', revenue, '', ''],
        ['Sales:', sales.toString(), '', '']
    ];

    const currentDate = new Date();
    const dateStr = format(currentDate, "yyyyMMddHHmmss");

	autoTable(pdf, {
		head: [columns],
		body: buyersData,
		startY: 48, // Adjust as needed
		margin: { top: 40 },
		theme: "grid",
		headStyles: { fillColor: "#F2602D", textColor: "#fff", fontStyle: "bold" },
		columnStyles: { 0: { halign: 'center' } }, // Center align the first column
	});

    return (
		<>
			{/*

			<Button onClick={() => pdf.save('exportedData.pdf')}>
				Download
			</Button>
		
			*/}
			<Button onClick={() => pdf.save(`total_learner_report_${dateStr}.pdf`)}>
				Download
			</Button>
		</>
		
    );
}
