/**
 * v0 by Vercel.
 * @see https://v0.dev/t/KVT51XwHC0H
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {Button} from "@/components/ui/button"
import Layout from "@/components/Layout";
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader} from "@/components/ui/dialog";
import {useState} from "react";
import CreationForm from "@/components/ProposalForm";

export default function Proposals() {
	const [showDialog, setShowDialog] = useState(false);

	const onSubmit = () => {
		console.log("Submitted")
		setShowDialog(false)
	}

	return (
		<Layout>
			{showDialog && (
				<Dialog open={showDialog} onOpenChange={setShowDialog}>
					<DialogContent>
						<DialogClose className="close-button" onClick={() => setShowDialog(false)}/>
						<CreationForm onSubmitFunction={onSubmit}/>
					</DialogContent>
				</Dialog>
			)}
			<div className="flex flex-col items-center p-8 space-y-8">
				<h1 className="text-2xl font-bold font-['Anonymous Pro'], sans-serif">Dashboard</h1>
				<div className="flex space-x-8">
					<div className="w-[300px] p-4 border rounded-lg">
						<div className="flex items-center mb-4">
							<img src="/Illustrations/Table.png" alt="Idlewood" className="w-12 h-12 mr-4"/>
							<h2 className="text-xl font-semibold font-['Anonymous Pro'], sans-serif">Idlewood</h2>
						</div>
						<div className="space-y-4">
							<div>
								<h3 className="font-semibold font-['Anonymous Pro'], sans-serif">HOA</h3>
								<p className="font-['Anonymous Pro'], sans-serif">Members: 19</p>
							</div>
							<div>
								<h3 className="font-semibold font-['Anonymous Pro'], sans-serif">Proposals</h3>
								<p className="font-['Anonymous Pro'], sans-serif">Total 2024: 13</p>
								<p className="font-['Anonymous Pro'], sans-serif">Open proposals: 4</p>
								<p className="font-['Anonymous Pro'], sans-serif">Rejected: 2</p>
								<p className="font-['Anonymous Pro'], sans-serif">Passed: 7</p>
							</div>
							<div>
								<h3 className="font-semibold font-['Anonymous Pro'], sans-serif">Funds</h3>
								<p className="font-['Anonymous Pro'], sans-serif">Reserve: $1,420,000</p>
								<p className="font-['Anonymous Pro'], sans-serif">Spent 2024: $385,000</p>
							</div>
						</div>
					</div>
					<div className="flex flex-col space-y-8">
						<h1 className="text-2xl font-bold font-['Anonymous Pro'], sans-serif">Proposals</h1>
						<div className="grid grid-cols-2 gap-8">
							<div className="w-[200px] p-4 border rounded-lg">
								<div className="flex items-center mb-4">
									<img src="/Illustrations/Roads.png" alt="Streets" className="w-12 h-12 mr-4"/>
									<h2 className="text-xl font-semibold font-['Anonymous Pro'], sans-serif">Streets</h2>
								</div>
								<div className="space-y-2">
									<p className="font-['Anonymous Pro'], sans-serif">June 2024</p>
									<p className="font-['Anonymous Pro'], sans-serif">Pothole Swansea Rd</p>
									<p className="font-['Anonymous Pro'], sans-serif">Quote: $23,000</p>
								</div>
								<div className="flex justify-between mt-4">
									<Button variant="outline">Yes</Button>
									<Button variant="outline">No</Button>
								</div>
							</div>
							<div className="w-[200px] p-4 border rounded-lg">
								<div className="flex items-center mb-4">
									<img src="/Illustrations/Houses.png" alt="Properties" className="w-12 h-12 mr-4"/>
									<h2 className="text-xl font-semibold font-['Anonymous Pro'], sans-serif">Properties</h2>
								</div>
								<div className="space-y-2">
									<p className="font-['Anonymous Pro'], sans-serif">May 2024</p>
									<p className="font-['Anonymous Pro'], sans-serif">Trimming hedges</p>
									<p className="font-['Anonymous Pro'], sans-serif">Quote: $7,500</p>
								</div>
								<div className="flex justify-between mt-4">
									<Button variant="outline">Yes</Button>
									<Button variant="outline">No</Button>
								</div>
							</div>
							<div className="w-[200px] p-4 border rounded-lg">
								<div className="flex items-center mb-4">
									<img src="/Illustrations/Playground.png" alt="Playground" className="w-12 h-12 mr-4"/>
									<h2 className="text-xl font-semibold font-['Anonymous Pro'], sans-serif">Playground</h2>
								</div>
								<div className="space-y-2">
									<p className="font-['Anonymous Pro'], sans-serif">June 2024</p>
									<p className="font-['Anonymous Pro'], sans-serif">Painting benches</p>
									<p className="font-['Anonymous Pro'], sans-serif">Quote: $4,750</p>
								</div>
								<div className="flex justify-between mt-4">
									<Button variant="outline">Yes</Button>
									<Button variant="outline">No</Button>
								</div>
							</div>
							<div className="w-[200px] p-4 border rounded-lg">
								<div className="flex items-center mb-4">
									<img src="/Illustrations/Pool.png" alt="Pool" className="w-12 h-12 mr-4"/>
									<h2 className="text-xl font-semibold font-['Anonymous Pro'], sans-serif">Pool</h2>
								</div>
								<div className="space-y-2">
									<p className="font-['Anonymous Pro'], sans-serif">July 2024</p>
									<p className="font-['Anonymous Pro'], sans-serif">Pump replacement</p>
									<p className="font-['Anonymous Pro'], sans-serif">Quote: $12,000</p>
								</div>
								<div className="flex justify-between mt-4">
									<Button variant="outline">Yes</Button>
									<Button variant="outline">No</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Button variant="outline" className="rounded-full w-10 h-10 font-['Anonymous Pro'], sans-serif" onClick={() => setShowDialog(true)}>
					+
				</Button>
			</div>
		</Layout>
	)
}