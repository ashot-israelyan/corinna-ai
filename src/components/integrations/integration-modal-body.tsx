import { FC } from 'react';
import { CheckCircle2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StripeConnect } from '@/components/settings/stripe-connect';

type IntegrationModalBodyProps = {
	type: string;
	connections: {
		[key in 'stripe']: boolean;
	};
};

const IntegrationModalBody: FC<IntegrationModalBodyProps> = ({ type, connections }) => {
	switch (type) {
		case 'stripe':
			return (
				<div className="flex flex-col gap-2">
					<h2 className="font-bold">Stripe should like to access</h2>
					{[
						'Payment and bank information',
						'Products and services you sell',
						'Business and tax information',
						'Create and update Products',
					].map((item, key) => (
						<div key={key} className="flex gap-2 items-center pl-3">
							<CheckCircle2Icon />
							<p>{item}</p>
						</div>
					))}
					<div className="flex justify-between mt-10">
						<Button variant="outline">Learn more</Button>
						<StripeConnect connected={connections[type]} />
					</div>
				</div>
			);
		default:
			return <></>;
	}

	return <div></div>;
};

export default IntegrationModalBody;
