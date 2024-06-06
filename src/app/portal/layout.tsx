import { FC, PropsWithChildren } from 'react';
import PortalBanner from '@/components/portal/banner';

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="flex flex-col h-screen">
			<PortalBanner />
			<div className="container flex justify-center flex-1 h-0">{children}</div>
		</div>
	);
};

export default Layout;
