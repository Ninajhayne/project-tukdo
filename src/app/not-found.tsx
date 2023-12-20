
import Link from "next/link";
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
	return (
		<>
		<div className="min-h-screen flex items-center justify-center">
			<div className="max-w-3xl mx-auto p-8 font-sans text-center">
				<div className="text-6xl font-bold">
					404
				</div>
				<div className="text-lg font-light">
					The page you seek does not exist
				</div>
				<div className="flex items-center justify-center mt-8">
				<Link
					href="/"
				>
                    <Button>
					    Homepage
                    </Button>
				</Link>
				</div>
			</div>
		</div>
		</>
	);
};

export default NotFoundPage;
