'use client';

import { FC } from 'react';
import { useCompleteCustomerPayment } from '@/hooks/billing/use-billing';
import { PaymentElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/loader';

type CustomerPaymentFormProps = {
	onNext(): void;
};

export const CustomerPaymentForm: FC<CustomerPaymentFormProps> = ({ onNext }) => {
	const { processing, onMakePayment } = useCompleteCustomerPayment(onNext);

	return (
		<div className="flex flex-col">
			<PaymentElement />
			<Button type="submit" className="w-full mt-5" onClick={onMakePayment}>
				<Loader loading={processing}>Pay</Loader>
			</Button>
		</div>
	);
};
