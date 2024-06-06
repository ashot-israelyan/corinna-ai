import { UploadClient } from '@uploadcare/upload-client';
import { onAiChatBotAssistant, onGetCurrentChatBot } from '@/actions/bot';
import { postToParent } from '@/lib/utils';
import { ChatBotMessageProps, ChatBotMessageSchema } from '@/schemas/conversation.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

const upload = new UploadClient({
	publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string
});

export const useChatBot = () => {
	const [currentBot, setCurrentBot] = useState<
		| {
			name: string
			chatBot: {
				id: string
				icon: string | null
				welcomeMessage: string | null
				background: string | null
				textColor: string | null
				helpdesk: boolean
			} | null
			helpdesk: {
				id: string
				question: string
				answer: string
				domainId: string | null
			}[]
		}
		| undefined
	>();
	const [botOpened, setBotOpened] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [onChats, setOnChats] = useState<{ role: 'assistant' | 'user'; content: string; link?: string }[]>([]);
	const [onAiTyping, setOnAiTyping] = useState<boolean>(false);
	const [currentBotId, setCurrentBotId] = useState<string>();
	const [onRealTime, setOnRealTime] = useState<{ chatroom: string; mode: boolean } | undefined>(undefined);

	const messageWindowRef = useRef<HTMLDivElement | null>(null);

	const { register, handleSubmit, reset, formState: { errors } } = useForm<ChatBotMessageProps>({
		resolver: zodResolver(ChatBotMessageSchema),
	});

	const onOpenChatBot = () => setBotOpened(prev => !prev);

	const onScrollToBottom = () => {
		messageWindowRef.current?.scroll({
			top: messageWindowRef.current.scrollHeight,
			left: 0,
			behavior: 'smooth'
		});
	};

	const onGetDomainChatBot = async (id: string) => {
		setCurrentBotId(id);
		const chatbot = await onGetCurrentChatBot(id);
		if (chatbot) {
			setOnChats(prev => [
				...prev,
				{
					role: 'assistant',
					content: chatbot.chatBot?.welcomeMessage!,
				},
			]);
			setCurrentBot(chatbot);
			setLoading(false);
		}
	};

	const onStartChatting = handleSubmit(async (values) => {
		console.log('ALL VALUES', values)

		if (values?.image.length) {
			console.log('IMAGE FROM', values.image[0]);
			const uploaded = await upload.uploadFile(values.image[0]);
			setOnChats(prev => [
				...prev,
				{
					role: 'user',
					content: uploaded.uuid,
				}
			]);

			console.log('🟡 RESPONSE FROM UC', uploaded.uuid)
			setOnAiTyping(true);

			const response = await onAiChatBotAssistant(
				currentBotId!,
				onChats,
				'user',
				uploaded.uuid,
			);

			if (response) {
				setOnAiTyping(false);
				if (response.live) {
					setOnRealTime(prev => ({
						...prev,
						chatroom: response.chatRoom,
						mode: response.live
					}));
				} else {
					setOnChats((prev: any) => [...prev, response.response]);
				}
			}
		}

		reset();

		if (values.content) {
			if (!onRealTime?.mode) {
				setOnChats((prev: any) => [
					...prev,
					{
						role: 'user',
						content: values.content,
					}
				]);
			}
			setOnAiTyping(true);

			const response = await onAiChatBotAssistant(
				currentBotId!,
				onChats,
				'user',
				values.content,
			);

			if (response) {
				setOnAiTyping(false);
				if (response.live) {
					setOnRealTime(prev => ({
						...prev,
						chatroom: response.chatRoom,
						mode: response.live,
					}));
				} else {
					setOnChats((prev: any) => [...prev, response.response]);
				}
			}
		}
	});

	useEffect(() => {
		onScrollToBottom();
	}, [onChats]);

	useEffect(() => {
		postToParent(JSON.stringify({
			width: botOpened ? 550 : 80,
			height: botOpened ? 730 : 80,
		}));
	}, [botOpened]);

	let limitRequest = 0;

	useEffect(() => {
		const listener = (e: MessageEvent<any>) => {
			const botid = e.data;

			if (limitRequest < 1 && typeof botid === 'string') {
				onGetDomainChatBot(botid);
				limitRequest++
			}
		};

		window.addEventListener('message', listener);

		return () => window.removeEventListener('message', listener);
	}, [limitRequest]);

	return {
		botOpened,
		onOpenChatBot,
		onStartChatting,
		onChats,
		register,
		onAiTyping,
		messageWindowRef,
		currentBot,
		loading,
		setOnChats,
		onRealTime,
		errors,
	};
};