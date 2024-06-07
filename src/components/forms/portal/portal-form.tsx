'use client';

import { FC } from 'react';
import { usePortal } from '@/hooks/portal/use-portal';
import PortalSteps from './portal-steps';
import { cn } from '@/lib/utils';

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

	return (
		<form className="h-full flex flex-col gap-10 justify-between" onSubmit={onBookAppointment}>
			<PortalSteps
				loading={loading}
				slot={selectedSlot}
				bookings={bookings}
				onSlot={onSelectedTimeSlot}
				date={date}
				onBooking={setDate}
				step={step}
				type={type}
				questions={questions}
				error={errors}
				register={register}
				onNext={onNext}
				products={products}
				onBack={onPrev}
				amount={amount}
				stripeId={stripeId}
			/>
			{(step === 1 || step === 2) && (
				<div className="w-full justify-center">
					<div className="w-[400px] grid grid-cols-2 gap-3">
						<div
							className={cn(
								'rounded-full h-2 col-span-1',
								step === 1 ? 'bg-orange' : 'bg-platinum',
							)}
						/>
						<div
							className={cn(
								'rounded-full h-2 col-span-1',
								step === 2 ? 'bg-orange' : 'bg-platinum',
							)}
						/>
					</div>
				</div>
			)}
		</form>
	);
};

export default PortalForm;
