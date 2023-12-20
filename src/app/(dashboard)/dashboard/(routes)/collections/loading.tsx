import { DataTableLoading } from "@/components/data-table/data-table-loading"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"

export default function PurchasesLoading() {
  return (
    <Shell variant="sidebar">
      <PageHeader>
        <PageHeaderHeading size="sm">Collections</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage your collection
        </PageHeaderDescription>
      </PageHeader>
      <DataTableLoading columnCount={6} />
    </Shell>
  )
}
