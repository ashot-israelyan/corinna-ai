'use server';

import { client } from '@/lib/prisma';

export const onDomainCustomerResponses = async (customerId: string) => {
	try {
		const customerQuestions = await client.customer.findUnique({
			where: {
				id: customerId,
			},
			select: {
				email: true,
				questions: {
					select: {
						id: true,
						question: true,
						answered: true,
					},
				},
			},
		});

		if (customerQuestions) {
			return customerQuestions;
		}
	} catch (error) {
		console.error(error);
	}
};

export const onGetAllDomainBookings = async (domainId: string) => {
	try {
		const bookings = await client.bookings.findMany({
			where: {
				domainId,
			},
			select: {
				slot: true,
				date: true,
			},
		});

		if (bookings) {
			return bookings;
		}
	} catch (error) {
		console.error(error);
	}
};

export const onBookNewAppointment = async (
	domainId: string,
	customerId: string,
	slot: string,
	date: string,
	email: string,
) => {
	try {
		const booking = await client.customer.update({
			where: {
				id: customerId,
			},
			data: {
				booking: {
					create: {
						domainId,
						slot,
						date,
						email,
					},
				},
			},
		});

		if (booking) {
			return { status: 200, message: 'Booking created' };
		}
	} catch (error) {
		console.log(error);
	}
};

export const saveAnswers = async (questions: [question: string], customerId: string) => {
	try {
		for (const question in questions) {
			await client.customer.update({
				where: { id: customerId },
				data: {
					questions: {
						update: {
							where: {
								id: question,
							},
							data: {
								answered: questions[question],
							},
						},
					},
				},
			});
		}

		return {
			status: 200,
			message: 'Updated Responses',
		};
	} catch (error) {
		console.log(error);
	}
};
