"use client";

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'

import { Button } from "@/components/ui/button";
import { Course, Profile, Reservation } from '@prisma/client';
import { formatDate } from '@/lib/utils';
import { format } from "date-fns";

interface DownloadPdfButtonProps {
    reserve: {
        user: {
            id: string;
            userId: string;
            name: string;
            imageUrl: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
        };
        id: string;
        userId: string;
        listingId: string;
        startDate: Date;
        endDate: Date;
        updatedAt: Date;
    }[],
    tutor: {
        id: string;
        userId: string;
        name: string;
        imageUrl: string;
        email: string;
    };
}


export const DownloadPdfButton = ({
	reserve,
	tutor,
}: DownloadPdfButtonProps) => {
    const pdf = new jsPDF();

	const columns = ['#', 'Name', 'Total Payment', 'Start Date', 'End Date'];
	
	const totalReservation = reserve.length;
	
	
	// Set font to bold
	pdf.setFont("", "bold");

	// Add bold text
	pdf.text("TUKDO", 92, 20);

    // Set font size for "Total Learner" line
	pdf.setFont("", "normal");
	pdf.setFontSize(14); // Set the default font size, adjust as needed
	pdf.text(`TOTAL LIST OF LEARNER'S RESERVATION`, 15, 28);

    pdf.setFontSize(12); // Set the default font size, adjust as needed

    // Add total number of buyers to the line
	pdf.text(`Tutor Name: ${tutor.name}`, 15, 34);
    pdf.text(`Total Learner: ${totalReservation}`, 15, 40);

    // Reset font size to default



    const reserveData = reserve.map((reserve: any, index) => {
		
		// Truncate the name and title
        const truncatedName = reserve.user.name.substring(0, 30);

        // Replace 0 price with "Free"
        const price = reserve.totalPrice === 0 ? 'Free' : reserve.totalPrice;
		const startDate = formatDate(reserve.startDate);
		const endDate = formatDate(reserve.endDate);


        return [
			index + 1, // Add 1 to start numbering from 1,
            truncatedName,
            price,
			startDate,
			endDate,
        ];
    });


    const currentDate = new Date();
    const dateStr = format(currentDate, "yyyyMMddHHmmss");

	autoTable(pdf, {
		head: [columns],
		body: reserveData,
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
			<Button onClick={() => pdf.save(`total_reservation_report_${dateStr}.pdf`)}>
				Download Report
			</Button>
		</>
		
    );
}
