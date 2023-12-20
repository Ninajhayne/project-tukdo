import { AlertTriangle, CheckCircleIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const bannerVariants = cva(
    "text-center p-4 text-sm flex items-center w-full",
    {
        variants: {
            variant: {
                warning: "bg-[#F7B955] text-black",
                success: "bg-[#45A557] text-white",
            }
        },
        defaultVariants: {
            variant: "warning",
        }
    }
);

interface BannerProps extends VariantProps<typeof bannerVariants> {
    label: string;
};

const iconMap = {
    warning: AlertTriangle,
    success: CheckCircleIcon,
}

export const Banner = ({
    label,
    variant, 
}: BannerProps) => {
    const Icon = iconMap[variant || "warning"];

    return (
        <div className={cn(bannerVariants({ variant }))}>
            <Icon className="h-4 w-4 mr-2 "/>
            {label}
        </div>
    );
};

