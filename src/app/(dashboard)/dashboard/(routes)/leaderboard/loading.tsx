import { DataTableLoading } from "@/components/data-table/data-table-loading"
/*
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
*/
import { Shell } from "@/components/shells/shell"

export default function LeaderBoardLoading() {
  return (
    <Shell variant="sidebar">
      <DataTableLoading columnCount={6} />
    </Shell>
  ) 
}
