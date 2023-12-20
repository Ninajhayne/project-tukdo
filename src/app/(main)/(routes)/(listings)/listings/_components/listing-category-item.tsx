"use client";

import qs from "query-string";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { IconType } from "react-icons";

interface ListingCategoryItemProps {
    label: string;
    value?: string;
    icon?: IconType;
    searchParams: {
        title?: string;
        listingCategoryId?: string;
		price_range?: string;
        mode?: string;
    };
}

export const ListingCategoryItem = ({
    label,
    value,
    icon: Icon,
    searchParams,
}: ListingCategoryItemProps) => {
    const pathname = usePathname();
    const router = useRouter();
    //const searchParams = useSearchParams();

    const currentCategoryId = searchParams?.listingCategoryId;
	const isSelected = currentCategoryId === value;
	const isSelectedAgain = currentCategoryId === value && isSelected;

	const onClick = () => {
		const url = qs.stringifyUrl({
			url: pathname || "",
			query: {
				listingCategoryId: isSelectedAgain ? null : value,
				price_range: searchParams.price_range || null,
                mode: searchParams.mode || null
			}
		}, { skipNull: true, skipEmptyString: true });

		router.push(url);
	};

    return (
        <button
            onClick={onClick}
            className={`
                flex flex-col items-center justify-center gap-1 p-2 border-b-2 hover:text-neutral-800 transition cursor-pointer dark:text-slate-200
                ${isSelected ? 'border-b-neutral-800 dark:border-b-white' : 'border-transparent'}
                ${isSelected ? 'text-neutral-800' : 'text-neutral-600'}
            `}
            type="button"
        >
            {Icon && <Icon size={24}/>}
            <div className="font-medium text-xs truncate">
                {label}
            </div>
        </button>
    );
};