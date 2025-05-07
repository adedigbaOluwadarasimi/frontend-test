'use client';

import * as React from 'react';
import { toast } from '@/components/core/toaster';

export interface ViewerContextValue {
	isFocusModeEnabled: boolean;
	onDocumentDownload: () => void;
	onDocumentUpload: () => void;
	onFocusModeToggle: () => void;
	onDocumentPrint: () => void;
}

export const ViewerContext = React.createContext<ViewerContextValue>({
	isFocusModeEnabled: false,
	onDocumentDownload: () => {},
	onDocumentUpload: () => {},
	onFocusModeToggle: () => {},
	onDocumentPrint: () => {},
});

interface ViewerContextProviderProps {
	children: React.ReactNode;
}

export default function ViewerContextProvider({
	children,
}: ViewerContextProviderProps): React.JSX.Element {
	// const [data, setData] = React.useState<[]>([]);
	const [isFocusModeEnabled, setIsFocusModeEnabled] = React.useState(false);

	const onDocumentDownload = () => {
		toast.info('Document download initiated');
	};

	const onDocumentUpload = () => {
		toast.info('Document upload initiated');
	};

	const onDocumentPrint = () => {
		toast.info('Document print initiated');
	};

	const onFocusModeToggle = () => {
		setIsFocusModeEnabled((prev) => !prev);
		toast.info(`Focus mode turned ${isFocusModeEnabled ? 'on' : 'off'}`);
	};
	return (
		<ViewerContext.Provider
			value={{
				isFocusModeEnabled,
				onDocumentDownload,
				onDocumentUpload,
				onFocusModeToggle,
				onDocumentPrint,
			}}
		>
			{children}
		</ViewerContext.Provider>
	);
}

export function useViewerContext(): ViewerContextValue {
	return React.useContext(ViewerContext);
}
