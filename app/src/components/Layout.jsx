import Image from "next/image";
import {DynamicWidget} from '@dynamic-labs/sdk-react-core';

export default function Layout({children}) {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
			<div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4">
				<div className="flex items-center">
					<Image
						width={128}
						height={128}
						alt="Logo"
						src="/Logo_PNG/Logo_Black_Horizontal.png"
					/>
				</div>
				<div className="flex items-center">
					<DynamicWidget/>
				</div>
			</div>
			{children}
		</div>
	);
}
