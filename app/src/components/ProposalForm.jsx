import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {useRouter} from "next/router";

export default function CreationForm({onSubmitFunction}) {
	const router = useRouter();

	const formSchema =
		z.object({
			title: z.string().min(1, {
				message: "Title must not be blank.",
			}),
			description: z.string().min(1, {
				message: "Description must not be blank.",
			}),
			price: z.number().min(0, {
				message: "Price must be greater than or equal to 0.",
			}),
		});

	const form = useForm({
		resolver: zodResolver(formSchema),
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmitFunction)} className="w-full space-y-4 px-1">
				<FormField control={form.control} name="title" render={({field}) => (
					<FormItem>
						<FormLabel>Title</FormLabel>
						<FormControl>
							<Input {...field} />
						</FormControl>
						<FormMessage/>
					</FormItem>
				)}/>
				<FormField control={form.control} name="description" render={({field}) => (
					<FormItem>
						<FormLabel>Description</FormLabel>
						<FormControl>
							<Textarea {...field} />
						</FormControl>
						<FormMessage/>
					</FormItem>
				)}/>
				<FormField control={form.control} name="price" render={({field}) => (
					<FormItem>
						<FormLabel>Price</FormLabel>
						<FormControl>
							<Input type="number" {...field} />
						</FormControl>
						<FormMessage/>
					</FormItem>
				)}/>
				<Button className="bg-[#245D00] w-full" type="submit">Submit</Button>
			</form>
		</Form>
	)
}
