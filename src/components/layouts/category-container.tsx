"use client";

interface CategoryContainerProps {
	children: React.ReactNode
};

const CategoryContainer: React.FC<CategoryContainerProps> = ({ children }) => {
	return ( 
		<div className="mx-auto px-8">
            {children}
        </div>
	);
};
 
export default CategoryContainer;

/*<div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
            {children}
        </div>*/

        /*
        <div className="mx-auto px-8">
            {children}
        </div>
        */