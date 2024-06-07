import { FC, PropsWithChildren } from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

type DataTableProps = {
	headers: string[];
};

const DataTable: FC<PropsWithChildren<DataTableProps>> = ({ headers, children }) => {
	return (
		<Table className="rounded-t-xl overflow-hidden">
			<TableHeader>
				<TableRow>
					{headers.map((header, key) => (
						<TableHead
							key={key}
							className={cn(key === headers.length - 1 && 'text-right', 'text-black')}
						>
							{header}
						</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>{children}</TableBody>
		</Table>
	);
};

export default DataTable;
