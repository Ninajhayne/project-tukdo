"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
//import { type Product } from "@/db/schema"
import { Category, Course } from "@prisma/client"
//import { CircleIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons"
//import { Icons } from "@/components/icons"

import { courseCategories } from "@/config/courses"
import { cn, isMacOs } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"
import { Button } from "@/components/ui/button"
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command"
import { Skeleton } from "@/components/ui/skeleton"
import { filterCoursesAction } from "@/app/_actions/course/course"
import { CircleIcon, Search } from "lucide-react"

interface CourseGroup {
	category: (Pick<Category, "name">)[]
	courses: (Pick<Course, "title" | "categoryId" | "id">)[]
}

export function CommandMenu() {
	const router = useRouter()
	const [isOpen, setIsOpen] = React.useState(false)
	const [query, setQuery] = React.useState("")
	const debouncedQuery = useDebounce(query, 300)
	const [data, setData] = React.useState<CourseGroup[] | null>(null)
	const [isPending, startTransition] = React.useTransition()
	
	React.useEffect(() => {
		if (debouncedQuery.length <= 0) {
			setData(null)
			return
		}

		let mounted = true
		function fetchData() {
			startTransition(async () => {
				const data = await filterCoursesAction(debouncedQuery)
				if (mounted) {
					setData(data)
				}
			})
		}

		fetchData()

		return () => {
			mounted = false
		}
	}, [debouncedQuery])
	

	React.useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				setIsOpen((isOpen) => !isOpen)
			}
		}
		window.addEventListener("keydown", handleKeyDown)
		return () => window.removeEventListener("keydown", handleKeyDown)
	}, [])

	const handleSelect = React.useCallback((callback: () => unknown) => {
		setIsOpen(false)
		callback()
	}, [])

	React.useEffect(() => {
		if (!isOpen) {
			setQuery("")
		}
	}, [isOpen]);

	return (
		<>
			<Button
				variant="outline"
				className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
				onClick={() => setIsOpen(true)}
			>
				<Search className="h-4 w-4 xl:mr-2" aria-hidden="true" />
				<span className="hidden xl:inline-flex">Search...</span>
				<span className="sr-only">Search</span>
				<kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 xl:flex">
					<abbr
						title={isMacOs() ? "Command" : "Control"}
						className="no-underline"
					>
						{isMacOs() ? "⌘" : "Ctrl"}
					</abbr>
					K
				</kbd>
			</Button>
			<CommandDialog 
				//position="top" 
				open={isOpen} 
				onOpenChange={setIsOpen}
			>
				<CommandInput
					placeholder="Search..."
					value={query}
					onValueChange={setQuery}
				/>
				<CommandList>
					<CommandEmpty
						className={cn(isPending ? "hidden" : "py-6 text-center text-sm")}
					>
						Nothing here.
					</CommandEmpty>
					{isPending ? (
						<div className="space-y-1 overflow-hidden px-1 py-2">
							<Skeleton className="h-4 w-10 rounded" />
							<Skeleton className="h-8 rounded-sm" />
							<Skeleton className="h-8 rounded-sm" />
						</div>
					) : (
						data?.map((group) => (
							<CommandGroup
								key={group.category[0].name}
								className="capitalize"
								heading={group.category[0].name}
							>
								{group.courses.map((item) => {
									const CategoryIcon =
									courseCategories.find((category) => category.title === group.category[0].name)?.icon ?? CircleIcon

									return (
										<CommandItem
											key={item.id}
											value={item.title}
											onSelect={() =>
												handleSelect(() => router.push(`/course/${item.id}`))
											}
										>
											<CategoryIcon
												className="mr-2 h-4 w-4 text-muted-foreground"
												aria-hidden="true"
											/>
											<span className="truncate">{item.title}</span>
										</CommandItem>
									)
								})}
							</CommandGroup>
						))
					)}
				</CommandList>
			</CommandDialog>
		</>
	)
}
