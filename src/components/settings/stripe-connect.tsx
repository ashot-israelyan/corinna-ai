'use client';

import { Button } from '@/components/ui/button';
import { Loader } from '@/components/loader';
import { useStripe } from '@/hooks/billing/use-billing';

type StripeConnectProps = {
	connected: boolean;
};

export const StripeConnect = ({ connected }: StripeConnectProps) => {
	const { onStripeConnect, onStripeAccountPending } = useStripe();

	return (
		<Button disabled={connected} onClick={onStripeConnect}>
			<Loader loading={onStripeAccountPending}>
				{connected ? 'Connected' : 'Connect to stripe'}
			</Loader>
		</Button>
	);
};
