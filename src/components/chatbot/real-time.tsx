import { Dispatch, FC, SetStateAction } from 'react';
import { Card } from '../ui/card';

type Props = {
	chatRoomId: string;
	setChats: Dispatch<
		SetStateAction<
			{
				role: 'user' | 'assistant';
				content: string;
				link?: string;
			}[]
		>
	>;
};

const RealTimeMode: FC<Props> = ({ chatRoomId, setChats }) => {
	return (
		<Card className="px-3 rounded-full py-1 bg-orange font-bold text-white text-sm">Real Time</Card>
	);
};

export default RealTimeMode;