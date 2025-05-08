'use client';

import * as React from 'react';
import { toast } from '@/components/core/toaster';
import {
	DOCUMENT_UPLOAD_STATUS,
	LEFT_SIDEBAR_ENUMS,
	TOOLBAR_BTNS,
} from '@/lib/enums';

export interface ViewerContextValue {
	isFocusModeEnabled: boolean;
	activeToolbarBtn: TOOLBAR_BTNS;
	activeSidebarBtn: LEFT_SIDEBAR_ENUMS;
	documentUploadStatus: DOCUMENT_UPLOAD_STATUS;
	document: File | null;
	updateActiveToolbarBtn: (param: TOOLBAR_BTNS) => void;
	updateActiveSidebarBtn: (param: LEFT_SIDEBAR_ENUMS) => void;
	onDocumentDownload: () => void;
	onDocumentUpload: (document: File) => void;
	updateDocumentUploadStatus: (param: DOCUMENT_UPLOAD_STATUS) => void;
	onDocumentUploadCancel: () => void;
	onFocusModeToggle: () => void;
	onDocumentPrint: () => void;
	onFutureFeatClick: () => void;
}

export const ViewerContext = React.createContext<ViewerContextValue>({
	isFocusModeEnabled: false,
	activeToolbarBtn: TOOLBAR_BTNS.NONE,
	activeSidebarBtn: LEFT_SIDEBAR_ENUMS.POPULAR,
	documentUploadStatus: DOCUMENT_UPLOAD_STATUS.PRE_UPLOAD,
	document: null,
	updateActiveToolbarBtn: () => {},
	updateActiveSidebarBtn: () => {},
	onDocumentDownload: () => {},
	onDocumentUpload: () => {},
	onDocumentUploadCancel: () => {},
	updateDocumentUploadStatus: () => {},
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
	const [isFocusModeEnabled, setIsFocusModeEnabled] = React.useState(false);
	const [activeToolbarBtn, setActiveToolbarBtn] = React.useState(
		TOOLBAR_BTNS.NONE
	);
	const [activeSidebarBtn, setActiveSidebarBtn] = React.useState(
		LEFT_SIDEBAR_ENUMS.POPULAR
	);
	const [document, setDocument] = React.useState<File | null>(null);

	const [documentUploadStatus, setDocumentUploadStatus] =
		React.useState<DOCUMENT_UPLOAD_STATUS>(
			DOCUMENT_UPLOAD_STATUS.PRE_UPLOAD
		);

	const onDocumentDownload = () => {
		toast.info('Document download initiated');
	};

	const onDocumentUpload = (document: File) => {
		setDocument(document);
		setDocumentUploadStatus(DOCUMENT_UPLOAD_STATUS.UPLOADING);
		toast.info('Document upload initiated');
	};

	const onDocumentUploadCancel = () => {
		setDocument(null);
		setDocumentUploadStatus(DOCUMENT_UPLOAD_STATUS.PRE_UPLOAD);
		toast.info('Document upload cancelled');
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

	const updateDocumentUploadStatus = (param: DOCUMENT_UPLOAD_STATUS) => {
		setDocumentUploadStatus(param);
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
				documentUploadStatus,
				document,
				onDocumentUploadCancel,
				updateDocumentUploadStatus,
			}}
		>
			{children}
		</ViewerContext.Provider>
	);
}

export function useViewerContext(): ViewerContextValue {
	return React.useContext(ViewerContext);
}
