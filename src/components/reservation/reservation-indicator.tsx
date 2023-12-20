import { db } from "@/lib/db";
import { formatDateV2 } from "@/lib/utils";
import { Plaza } from "@prisma/client";


import { CalendarIcon } from "@radix-ui/react-icons";

interface ReservationIndicatorProps {
	memberId: string;
	plaza: Plaza;
}

const ReservationIndicator = async ({
	memberId,
	plaza,
}: ReservationIndicatorProps) => {

	const reservation = await db.reservation.findUnique({
		where: {
			userId: memberId,
			listingId: plaza.listingId
		}
	});

	if (!reservation) {
		return null;
	}

	return (
		<p 
			className="flex items-center text-xs"
		>
			<CalendarIcon 
				className="mr-1"
			/>
			{`${formatDateV2(reservation.startDate, 'MMM d')} - ${formatDateV2(reservation.endDate, 'MMM d')}`}
		</p>
	);
};

export default ReservationIndicator;
