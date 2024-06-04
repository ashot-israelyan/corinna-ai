import { useTheme } from 'next-themes';
import { UploadClient } from '@uploadcare/upload-client';
import { useForm } from 'react-hook-form';
import { ChangePasswordProps, ChangePasswordSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { onUpdatePassword } from '@/actions/settings';

const upload = new UploadClient({
	publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string,
});

export const useThemeMode = () => {
	const { setTheme, theme } = useTheme();

	return {
		setTheme,
		theme,
	};
};

export const useChangePassword = () => {
	const [loading, setLoading] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ChangePasswordProps>({
		resolver: zodResolver(ChangePasswordSchema),
		mode: 'onChange',
	});

	const { toast } = useToast();

	const onChangePassword = handleSubmit(async (values) => {
		try {
			setLoading(true);

			const updated = await onUpdatePassword(values.password);

			if (updated) {
				reset();
				setLoading(false);
				toast({
					title: 'Success',
					description: updated.message,
				});
			}
		} catch (error) {
			console.log(error);
		}
	});

	return {
		register,
		errors,
		onChangePassword,
		loading,
	};
};
