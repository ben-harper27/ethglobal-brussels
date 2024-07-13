import Image from "next/image";
import {DynamicWidget} from '@dynamic-labs/sdk-react-core';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
			<div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4">
				<div className="flex items-center">
					<Image
						width={128}
						height={128}
						alt="Logo"
						className="w-10 h-10 rounded-xl"
						src="/logo.png"
					/>
					<div className="ml-2 text-2xl font-semibold text-gray-800 dark:text-gray-200">
						Foo
					</div>
				</div>
				<div className="flex items-center">
					<DynamicWidget/>
				</div>
			</div>
			<div className="flex flex-col items-center justify-center gap-4">
				<div className="text-4xl font-bold text-gray-700 dark:text-gray-300">
					Welcome to Foo
				</div>
			</div>
		</div>
	);
}
