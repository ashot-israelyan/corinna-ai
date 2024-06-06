'use client';

import { FC } from 'react';
import { usePortal } from '@/hooks/portal/use-portal';

type PortalFormProps = {
	questions: {
		id: string;
		question: string;
		answered: string | null;
	}[];
	type: 'Appointment' | 'Payment';
	customerId: string;
	domainid: string;
	email: string;
	bookings?:
		| {
				date: Date;
				slot: string;
		  }[]
		| undefined;
	products?:
		| {
				name: string;
				image: string;
				price: number;
		  }[]
		| undefined;
	amount?: number;
	stripeId?: string;
};

const PortalForm: FC<PortalFormProps> = ({
	questions,
	type,
	customerId,
	domainid,
	bookings,
	products,
	email,
	amount,
	stripeId,
}) => {
	const {
		step,
		onNext,
		onPrev,
		register,
		errors,
		date,
		setDate,
		onBookAppointment,
		onSelectedTimeSlot,
		selectedSlot,
		loading,
	} = usePortal(customerId, domainid, email);
	return <div></div>;
};

export default PortalForm;
