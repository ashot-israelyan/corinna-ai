import { FC } from 'react';
import Modal from '@/components/modal';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { CloudIcon } from 'lucide-react';
import IntegrationModalBody from '@/components/integrations/integration-modal-body';

type Props = {
	name: 'stripe';
	logo: string;
	title: string;
	description: string;
	connections: {
		[key in 'stripe']: boolean;
	};
};

const IntegrationTrigger: FC<Props> = ({ name, logo, title, description, connections }) => {
	return (
		<Modal
			title={title}
			type="Integration"
			logo={logo}
			description={description}
			trigger={
				<Card className="px-3 py-2 cursor-pointer flex gap-2">
					<CloudIcon />
					{connections[name] ? 'connected' : 'connect'}
				</Card>
			}
		>
			<Separator orientation="horizontal" />
			<IntegrationModalBody connections={connections} type={name} />
		</Modal>
	);
};

export default IntegrationTrigger;
