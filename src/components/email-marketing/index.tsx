import { FC } from 'react';
import { useEmailMarketing } from '@/hooks/email-marketing/use-marketing';

type Props = {
	domains: {
		customer: {
			Domain: {
				name: string;
			} | null;
			id: string;
			email: string | null;
		}[];
	}[];
	campaign: {
		name: string;
		id: string;
		customers: string[];
		createdAt: Date;
	}[];
	subscription: {
		plan: 'STANDARD' | 'PRO' | 'ULTIMATE';
		credits: number;
	} | null;
};

const EmailMarketing: FC<Props> = ({ campaign, domains, subscription }) => {
	const {
		onSelectedEmails,
		isSelected,
		onCreateCampaign,
		register,
		errors,
		loading,
		onSelectCampaign,
		processing,
		onAddCustomersToCampaign,
		campaignId,
		onBulkEmail,
		onSetAnswersId,
		isId,
		registerEmail,
		emailErrors,
		onCreateEmailTemplate,
		setValue,
	} = useEmailMarketing();

	return <>EmailMarketing</>;
};

export default EmailMarketing;
