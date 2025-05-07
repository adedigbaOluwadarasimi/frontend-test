'use client';

import * as React from 'react';
import { toast } from '@/components/core/toaster';
import { LEFT_SIDEBAR_ENUMS, TOOLBAR_BTNS } from '@/lib/enums';

export interface ViewerContextValue {
	isFocusModeEnabled: boolean;
	activeToolbarBtn: TOOLBAR_BTNS;
	activeSidebarBtn: LEFT_SIDEBAR_ENUMS;
	updateActiveToolbarBtn: (param: TOOLBAR_BTNS) => void;
	updateActiveSidebarBtn: (param: LEFT_SIDEBAR_ENUMS) => void;
	onDocumentDownload: () => void;
	onDocumentUpload: () => void;
	onFocusModeToggle: () => void;
	onDocumentPrint: () => void;
	onFutureFeatClick: () => void;
}

export const ViewerContext = React.createContext<ViewerContextValue>({
	isFocusModeEnabled: false,
	activeToolbarBtn: TOOLBAR_BTNS.NONE,
	activeSidebarBtn: LEFT_SIDEBAR_ENUMS.POPULAR,
	updateActiveToolbarBtn: () => {},
	updateActiveSidebarBtn: () => {},
	onDocumentDownload: () => {},
	onDocumentUpload: () => {},
	onFocusModeToggle: () => {},
	onDocumentPrint: () => {},
	onFutureFeatClick: () => {},
});

interface ViewerContextProviderProps {
	children: React.ReactNode;
}

export default function ViewerContextProvider({
	children,
}: ViewerContextProviderProps): React.JSX.Element {
	// const [data, setData] = React.useState<[]>([]);
	const [isFocusModeEnabled, setIsFocusModeEnabled] = React.useState(false);
	const [activeToolbarBtn, setActiveToolbarBtn] = React.useState(
		TOOLBAR_BTNS.NONE
	);
	const [activeSidebarBtn, setActiveSidebarBtn] = React.useState(
		LEFT_SIDEBAR_ENUMS.POPULAR
	);

	const onDocumentDownload = () => {
		toast.info('Document download initiated');
	};

	const onDocumentUpload = () => {
		toast.info('Document upload initiated');
	};

	const onDocumentPrint = () => {
		toast.info('Document print initiated');
	};

	const onFutureFeatClick = () => {
		toast.info("📦 This one's still in the box. Stay tuned!");
	};

	const onFocusModeToggle = () => {
		setIsFocusModeEnabled((prev) => !prev);
		toast.info(`Focus mode turned ${isFocusModeEnabled ? 'on' : 'off'}`);
	};

	const updateActiveToolbarBtn = (param: TOOLBAR_BTNS) => {
		setActiveToolbarBtn((prev) =>
			prev === param ? TOOLBAR_BTNS.NONE : param
		);
	};

	const updateActiveSidebarBtn = (param: LEFT_SIDEBAR_ENUMS) => {
		setActiveSidebarBtn(param);
	};
	return (
		<ViewerContext.Provider
			value={{
				isFocusModeEnabled,
				activeToolbarBtn,
				updateActiveToolbarBtn,
				onDocumentDownload,
				onDocumentUpload,
				onFocusModeToggle,
				onDocumentPrint,
				onFutureFeatClick,
				updateActiveSidebarBtn,
				activeSidebarBtn,
			}}
		>
			{children}
		</ViewerContext.Provider>
	);
}

export function useViewerContext(): ViewerContextValue {
	return React.useContext(ViewerContext);
}
