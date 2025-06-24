import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./pagination"
import { MetaPagination } from "@/types"
import { cn } from "@/lib/utils"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    meta?: MetaPagination
}

const TablePagination = ({ meta }: { meta: MetaPagination }) => (
    <Pagination className="py-5">
        <PaginationContent>
            {meta.links[0].url && (

                <PaginationItem>
                    <PaginationPrevious href={meta.links[0].url} />
                </PaginationItem>
            )}
            {meta.links.slice(1, -1).map((l) => (
                <PaginationItem key={l.url} className={cn(l.active ? "bg-secondary text-white rounded-md" : "")}>
                    <PaginationLink href={l.url!}>{l.label}</PaginationLink>
                </PaginationItem>
            ))}
            {/* <PaginationItem>
                <PaginationEllipsis />
            </PaginationItem> */}
            {
                meta.links.at(-1)?.url && (
                    <PaginationItem>
                        <PaginationNext href={meta.links.at(-1)?.url ?? "#"} />
                    </PaginationItem>
                )
            }
        </PaginationContent>
    </Pagination>
)

export function DataTable<TData, TValue>({
    columns,
    data,
    meta
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="rounded-md border">
            <Table className="relative w-full">
                <TableHeader className="sticky top-0 bg-background z-10">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead className="text-primary font-semibold text-center py-4 text-[16px]" key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody className="h-60">
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className="hover:bg-gray-100 transition-colors"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell className="text-center py-6" key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                Aucun résultats.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {meta && (
                <TablePagination meta={meta} />
            )}
        </div>
    )
}