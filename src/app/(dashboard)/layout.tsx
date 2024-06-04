import { FC, PropsWithChildren } from 'react';
import { onLoginUser } from '@/actions/auth';
import { ChatProvider } from '@/context/user-chat-context';
import Sidebar from '@/components/sidebar';

const OwnerLayout: FC<PropsWithChildren> = async ({ children }) => {
	const authenticated = await onLoginUser();
	if (!authenticated) return null;

	return (
		<ChatProvider>
			<div className="flex h-screen w-full">
				<Sidebar domains={authenticated.domain} />
				<div className="w-full h-screen flex flex-col pl-20 pr-20 md:pl-4 md:pr-4">{children}</div>
			</div>
		</ChatProvider>
	);
};

export default OwnerLayout;
