/**
 * v0 by Vercel.
 * @see https://v0.dev/t/K3s4VifbLgr
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import Layout from "@/components/Layout";

export default function Component() {
	return (
		<Layout>
			<div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
				<div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
					<div className="space-y-2">
						<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">HOA Proposals</h1>
						<p className="text-muted-foreground">Review and vote on proposals from your community.</p>
					</div>
					<div className="flex items-center gap-4">
						<Select>
							<SelectTrigger className="w-48">
								<SelectValue placeholder="Filter by category"/>
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="landscaping">Landscaping</SelectItem>
								<SelectItem value="security">Security</SelectItem>
								<SelectItem value="amenities">Amenities</SelectItem>
								<SelectItem value="rules">Rules</SelectItem>
							</SelectContent>
						</Select>
						<Select>
							<SelectTrigger className="w-48">
								<SelectValue placeholder="Filter by status"/>
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="open">Open</SelectItem>
								<SelectItem value="pending">Pending</SelectItem>
								<SelectItem value="approved">Approved</SelectItem>
								<SelectItem value="rejected">Rejected</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					<Card>
						<CardHeader>
							<CardTitle>Upgrade Playground Equipment</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">
								Proposal to replace the aging playground equipment with new, modern, and safer options.
							</p>
						</CardContent>
						<CardFooter className="flex justify-between">
							<div className="text-sm text-muted-foreground">Category: Amenities</div>
							<Button>Vote</Button>
						</CardFooter>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Install Security Cameras</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">
								Proposal to install security cameras at the community entrances and common areas to improve safety.
							</p>
						</CardContent>
						<CardFooter className="flex justify-between">
							<div className="text-sm text-muted-foreground">Category: Security</div>
							<Button>Vote</Button>
						</CardFooter>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Repaint Community Fences</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">
								Proposal to repaint the community fences to improve the overall aesthetic of the neighborhood.
							</p>
						</CardContent>
						<CardFooter className="flex justify-between">
							<div className="text-sm text-muted-foreground">Category: Landscaping</div>
							<Button>Vote</Button>
						</CardFooter>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Update Community Rules</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">
								Proposal to update the community rules to address new issues and concerns raised by residents.
							</p>
						</CardContent>
						<CardFooter className="flex justify-between">
							<div className="text-sm text-muted-foreground">Category: Rules</div>
							<Button>Vote</Button>
						</CardFooter>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Renovate Clubhouse</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">
								Proposal to renovate the community clubhouse, including upgrading the facilities and adding new
								amenities.
							</p>
						</CardContent>
						<CardFooter className="flex justify-between">
							<div className="text-sm text-muted-foreground">Category: Amenities</div>
							<Button>Vote</Button>
						</CardFooter>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Improve Landscaping</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">
								Proposal to enhance the community&apos;s landscaping, including planting new trees, shrubs, and flowers.
							</p>
						</CardContent>
						<CardFooter className="flex justify-between">
							<div className="text-sm text-muted-foreground">Category: Landscaping</div>
							<Button>Vote</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</Layout>
	)
}