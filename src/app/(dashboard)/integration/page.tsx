import InfoBar from '@/components/infobar';
import { onGetPaymentConnected } from '@/actions/settings';
import IntegrationsList from '@/components/integrations';

const Page = async () => {
	const payment = await onGetPaymentConnected();

	const connections = {
		stripe: !!payment,
	};
	return (
		<>
			<InfoBar />
			<IntegrationsList connections={connections} />
		</>
	);
};

export default Page;
