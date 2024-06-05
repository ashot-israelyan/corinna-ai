'use client';
import Section from '@/components/section-label';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { FormMessage } from '@/components/ui/form';
import { useHelpDesk } from '@/hooks/settings/use-settings';
import { FC } from 'react';
import FormGenerator from '../form-generator';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/loader';
import Accordion from '@/components/accordion';

const HelpDesk: FC<{ id: string }> = ({ id }) => {
	const { register, errors, onSubmitQuestion, isQuestions, loading } = useHelpDesk(id);

	return (
		<Card className="w-full grid grid-cols-1 lg:grid-cols-2">
			<CardContent className="p-6 border-r-[1px]">
				<CardTitle>Help Desk</CardTitle>
				<form onSubmit={onSubmitQuestion} className="flex flex-col gap-6 mt-10">
					<div className="flex flex-col gap-3">
						<Section
							label="Question"
							message="Add a question that you belive is frequently asked"
						/>
						<FormGenerator
							inputType="input"
							register={register}
							errors={errors}
							form="help-desk-form"
							name="question"
							placeholder="Type your question"
							type="text"
						/>
					</div>
					<div className="flex flex-col gap-3">
						<Section label="Answer to question" message="The answer for the question above." />
						<FormGenerator
							inputType="textarea"
							register={register}
							errors={errors}
							name="answer"
							form="help-desk-form"
							placeholder="Type your answer"
							type="text"
							lines={5}
						/>
					</div>
					<Button
						type="submit"
						className="bg-orange hover:bg-orange hover:opacity-70 transition duration-150 ease-in-out text-white font-semibold"
					>
						Create
					</Button>
				</form>
			</CardContent>
			<CardContent className="p-6 overflow-y-auto chat-window">
				<Loader loading={loading}>
					{isQuestions.length ? (
						isQuestions.map((question) => (
							<Accordion key={question.id} trigger={question.question} content={question.answer} />
						))
					) : (
						<CardDescription>No Questions to show</CardDescription>
					)}
				</Loader>
			</CardContent>
		</Card>
	);
};

export default HelpDesk;
