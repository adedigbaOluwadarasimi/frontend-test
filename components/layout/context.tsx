'use client';

import * as React from 'react';
import { toast } from '@/components/core/toaster';
import {
	DOCUMENT_UPLOAD_STATUS,
	LEFT_SIDEBAR_ENUMS,
	TOOLBAR_BTNS,
} from '@/lib/enums';
import useHistory from '../core/use-history';

export type cursorMode = 'pan' | 'cursor' | 'grabbing';

interface documentProps {
	rotate: number;
}

const initDocumentProps: documentProps = {
	rotate: 0,
};
export interface ViewerContextValue {
	isFocusModeEnabled: boolean;
	activeToolbarBtn: TOOLBAR_BTNS;
	activeSidebarBtn: LEFT_SIDEBAR_ENUMS;
	documentUploadStatus: DOCUMENT_UPLOAD_STATUS;
	document: File | null;
	canvasScale: number;
	cursorMode: cursorMode;
	currentPage: number;
	pageCount: number;
	documentProps: documentProps;
	redo: () => void;
	undo: () => void;
	canUndo: boolean;
	canRedo: boolean;
	updateActiveToolbarBtn: (param: TOOLBAR_BTNS) => void;
	updateActiveSidebarBtn: (param: LEFT_SIDEBAR_ENUMS) => void;
	onDocumentDownload: () => void;
	onDocumentUpload: (document: File) => void;
	updateDocumentUploadStatus: (param: DOCUMENT_UPLOAD_STATUS) => void;
	onDocumentUploadCancel: () => void;
	onFocusModeToggle: () => void;
	onDocumentPrint: () => void;
	onFutureFeatClick: () => void;
	updateCanvasScale: (newScale: number) => void;
	updateCursorMode: (newMode: cursorMode) => void;
	updateCurrentPage: (newPage: number) => void;
	updatePageCount: (param: number) => void;
	updateDocumentProps: (
		payload: (
			currentProps: documentProps,
			initProps: documentProps
		) => documentProps | documentProps
	) => void;
}

export const ViewerContext = React.createContext<ViewerContextValue>({
	isFocusModeEnabled: false,
	activeToolbarBtn: TOOLBAR_BTNS.NONE,
	activeSidebarBtn: LEFT_SIDEBAR_ENUMS.POPULAR,
	documentUploadStatus: DOCUMENT_UPLOAD_STATUS.PRE_UPLOAD,
	cursorMode: 'cursor',
	canvasScale: 1,
	document: null,
	currentPage: 1,
	pageCount: 1,
	documentProps: initDocumentProps,
	canRedo: false,
	canUndo: false,
	undo: () => {},
	redo: () => {},
	updateActiveToolbarBtn: () => {},
	updateActiveSidebarBtn: () => {},
	onDocumentDownload: () => {},
	onDocumentUpload: () => {},
	onDocumentUploadCancel: () => {},
	updateDocumentUploadStatus: () => {},
	onFocusModeToggle: () => {},
	onDocumentPrint: () => {},
	onFutureFeatClick: () => {},
	updateCanvasScale: () => {},
	updateCursorMode: () => {},
	updateCurrentPage: () => {},
	updatePageCount: () => {},
	updateDocumentProps: () => {},
});

interface ViewerContextProviderProps {
	children: React.ReactNode;
}

export default function ViewerContextProvider({
	children,
}: ViewerContextProviderProps): React.JSX.Element {
	const {
		state: documentProps,
		update: setDocumentProps,
		canRedo,
		canUndo,
		redo: redoDocumentPropsUpdate,
		undo: undoDocumentPropsUpdate,
	} = useHistory<documentProps>(initDocumentProps);

	const [isFocusModeEnabled, setIsFocusModeEnabled] = React.useState(false);
	const [activeToolbarBtn, setActiveToolbarBtn] = React.useState(
		TOOLBAR_BTNS.NONE
	);

	const [activeSidebarBtn, setActiveSidebarBtn] = React.useState(
		LEFT_SIDEBAR_ENUMS.POPULAR
	);

	const [document, setDocument] = React.useState<File | null>(null);
	const [canvasScale, setCanvasScale] = React.useState(1);

	const [cursorMode, setCursorMode] = React.useState<cursorMode>('cursor');
	const [currentPage, setCurrentPage] = React.useState(1);
	const [pageCount, setPageCount] = React.useState(1);

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

	const updateCanvasScale = (newScale: number) => {
		if (documentUploadStatus !== DOCUMENT_UPLOAD_STATUS.LOADED_IN_EDITOR)
			return toast.error(
				'Oops! You gotta be in editor mode to use this.'
			);
		setCanvasScale(newScale);
	};

	const updateCursorMode = (newMode: cursorMode) => {
		if (
			newMode === 'pan' &&
			documentUploadStatus !== DOCUMENT_UPLOAD_STATUS.LOADED_IN_EDITOR
		)
			return toast.error(
				'Oops! You gotta be in editor mode to use this.'
			);
		setCursorMode(newMode);
	};

	const updateCurrentPage = (newPage: number) => {
		if (documentUploadStatus !== DOCUMENT_UPLOAD_STATUS.LOADED_IN_EDITOR)
			return toast.error(
				'Oops! You gotta be in editor mode to use this.'
			);
		setCurrentPage(newPage);
	};

	const updatePageCount = (param: number) => {
		if (documentUploadStatus !== DOCUMENT_UPLOAD_STATUS.LOADED_IN_EDITOR)
			return toast.error(
				'Oops! You gotta be in editor mode to use this.'
			);
		setPageCount(param);
	};

	const updateDocumentProps = (
		payload: (
			currentProps: documentProps,
			initProps: documentProps
		) => documentProps | documentProps
	) => {
		if (documentUploadStatus !== DOCUMENT_UPLOAD_STATUS.LOADED_IN_EDITOR)
			return toast.error(
				'Oops! You gotta be in editor mode to use this.'
			);

		setDocumentProps(
			typeof payload === 'function'
				? payload(documentProps, initDocumentProps)
				: payload
		);
	};

	const undo = () => {
		if (documentUploadStatus !== DOCUMENT_UPLOAD_STATUS.LOADED_IN_EDITOR)
			return toast.error(
				'Oops! You gotta be in editor mode to use this.'
			);

		undoDocumentPropsUpdate();
	};

	const redo = () => {
		if (documentUploadStatus !== DOCUMENT_UPLOAD_STATUS.LOADED_IN_EDITOR)
			return toast.error(
				'Oops! You gotta be in editor mode to use this.'
			);

		redoDocumentPropsUpdate();
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
				canvasScale,
				updateCanvasScale,
				cursorMode,
				updateCursorMode,
				currentPage,
				updateCurrentPage,
				pageCount,
				updatePageCount,
				updateDocumentProps,
				documentProps,
				canRedo,
				canUndo,
				undo,
				redo,
			}}
		>
			{children}
		</ViewerContext.Provider>
	);
}

export function useViewerContext(): ViewerContextValue {
	return React.useContext(ViewerContext);
}
