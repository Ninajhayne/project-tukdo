import { 
    Card, 
    CardContent, 
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import { formatPrice } from "@/lib/format";
  
interface DataCardProps {
    value: number;
    label: string;
    shouldFormat?: boolean;
    bg: string;
}
  
export const DataCard = ({
    value,
    label,
    shouldFormat,
    bg,
}: DataCardProps) => {
    const cardStyle = {
        backgroundColor: bg,
    };
    return (
        <Card style={cardStyle} className="border-none shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium">
                    {label}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                    {shouldFormat ? formatPrice(value) : value}
                </div>
            </CardContent>
        </Card>
    );
};