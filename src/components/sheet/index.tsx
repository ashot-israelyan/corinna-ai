import { FC, PropsWithChildren, ReactNode } from 'react';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

type SideSheetProps = {
	trigger: ReactNode;
	title: string;
	description: string;
	className?: string;
};

export const SideSheet: FC<PropsWithChildren<SideSheetProps>> = ({
	trigger,
	title,
	description,
	children,
	className,
}) => {
	return (
		<Sheet>
			<SheetTrigger className={className}>{trigger}</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>{title}</SheetTitle>
					<SheetDescription>{description}</SheetDescription>
				</SheetHeader>
				{children}
			</SheetContent>
		</Sheet>
	);
};
