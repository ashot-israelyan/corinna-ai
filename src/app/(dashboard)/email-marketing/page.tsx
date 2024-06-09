import InfoBar from '@/components/infobar';
import { currentUser } from '@clerk/nextjs';
import { onGetAllCampaigns, onGetAllCustomers } from '@/actions/mail';
import EmailMarketing from '@/components/email-marketing';

const Page = async () => {
	const user = await currentUser();

	if (!user) return null;

	const customers = await onGetAllCustomers(user.id);
	const campaigns = await onGetAllCampaigns(user.id);

	return (
		<>
			<InfoBar />
			<EmailMarketing
				campaign={campaigns?.campaign!}
				subscription={customers?.subscription!}
				domains={customers?.domains!}
			/>
		</>
	);
};

export default Page;
