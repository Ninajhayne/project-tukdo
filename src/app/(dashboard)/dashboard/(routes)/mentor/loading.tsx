import { DataTableLoading } from "@/components/data-table/data-table-loading"

import { Shell } from "@/components/shells/shell"

export default function MentorDashboarLoading() {
    return (
        <Shell variant="sidebar">
            <DataTableLoading columnCount={6} />
        </Shell>
    )
}
