/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useMemo } from 'react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { useViewerContext } from '../layout/context';
import { motion } from 'motion/react';
import { DOCUMENT_UPLOAD_STATUS, TOOLBAR_BTNS } from '@/lib/enums';
import CustomCursor from './custom-cursor';
import {
	AreaHighlight,
	Content,
	PdfHighlighter,
	PdfLoader,
	Popup,
	ScaledPosition,
	Highlight,
} from 'react-pdf-highlighter';

import 'react-pdf-highlighter/dist/style.css';
import { Highlighter } from 'lucide-react';

const getNextId = () => String(Math.random()).slice(2);

export function PdfViewer() {
	const {
		documentUploadStatus,
		canvasScale,
		updateCanvasScale,
		cursorMode,
		activeToolbarBtn,
		document: file,
		documentProps,
		updateDocumentProps,
	} = useViewerContext();

	const url = useMemo(() => (file ? URL.createObjectURL(file) : ''), [file]);

	// const handleLoadSuccess = ({ numPages }: { numPages: number }) => {
	// 	updatePageCount(numPages);
	// };

	// const pdfViewerOptions = useMemo(
	// 	() => ({
	// 		cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
	// 		standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
	// 	}),
	// 	[]
	// );

	const addHighlight = (highlight: any) => {
		updateDocumentProps((prev) => ({
			...prev,
			highlights: [{ ...highlight, id: getNextId() }, ...prev.highlights],
		}));
	};

	const updateHighlight = (
		highlightId: string,
		position: Partial<ScaledPosition>,
		content: Partial<Content>
	) => {
		updateDocumentProps((prev) => ({
			...prev,
			highlights: prev.highlights.map((h) => {
				const {
					id,
					position: originalPosition,
					content: originalContent,
					...rest
				} = h;
				return id === highlightId
					? {
							id,
							position: { ...originalPosition, ...position },
							content: { ...originalContent, ...content },
							...rest,
					  }
					: h;
			}),
		}));
	};

	const HighlightPopup = ({
		comment,
	}: {
		comment: { text: string; emoji: string };
	}) =>
		comment.text ? (
			<div className='bg-primary'>
				{comment.emoji} {comment.text}
			</div>
		) : null;

	useEffect(() => {
		const wrapper = document.getElementById('pdfWrapper');
		if (
			!wrapper ||
			documentUploadStatus !== DOCUMENT_UPLOAD_STATUS.LOADED_IN_EDITOR
		)
			return;

		let isPanning = false;
		let startX: number,
			startY: number,
			scrollLeft: number,
			scrollTop: number;

		let scale = 1;
		let initialDistance: number | null = null;
		let lastScale = 1;

		const getDistance = (touches: TouchList) => {
			const [touch1, touch2] = [touches[0], touches[1]];
			const dx = touch1.clientX - touch2.clientX;
			const dy = touch1.clientY - touch2.clientY;
			return Math.hypot(dx, dy);
		};

		const disablePointerEvents = () =>
			wrapper.classList.add('disable-pointer');
		const enablePointerEvents = () =>
			wrapper.classList.remove('disable-pointer');

		const handleMouseDown = (e: MouseEvent) => {
			if (cursorMode !== 'pan') return;
			isPanning = true;
			wrapper.classList.add('grabbing');
			startX = e.pageX - wrapper.offsetLeft;
			startY = e.pageY - wrapper.offsetTop;
			scrollLeft = wrapper.scrollLeft;
			scrollTop = wrapper.scrollTop;
		};

		const handleMouseLeaveOrUp = () => {
			if (cursorMode !== 'pan') return;
			isPanning = false;
			wrapper.classList.remove('grabbing');
		};

		const handleMouseMove = (e: MouseEvent) => {
			if (!isPanning || cursorMode !== 'pan') return;
			e.preventDefault();
			const x = e.pageX - wrapper.offsetLeft;
			const y = e.pageY - wrapper.offsetTop;
			wrapper.scrollLeft = scrollLeft - (x - startX);
			wrapper.scrollTop = scrollTop - (y - startY);
		};

		const handleTouchStart = (e: TouchEvent) => {
			if (cursorMode !== 'pan') return;
			if (e.touches.length === 2) {
				disablePointerEvents();
				initialDistance = getDistance(e.touches);
				lastScale = scale;
			}
		};

		const handleTouchMove = (e: TouchEvent) => {
			if (cursorMode !== 'pan') return;
			if (e.touches.length === 2 && initialDistance) {
				e.preventDefault();
				const currentDistance = getDistance(e.touches);
				const zoomFactor = currentDistance / initialDistance;
				scale = Math.max(0.1, Math.min(zoomFactor * lastScale, 5));
				updateCanvasScale(scale);
			}
		};

		const handleTouchEnd = (e: TouchEvent) => {
			if (cursorMode !== 'pan') return;
			if (e.touches.length < 2) {
				initialDistance = null;
				enablePointerEvents();
			}
		};

		wrapper.addEventListener('mousedown', handleMouseDown);
		wrapper.addEventListener('mouseleave', handleMouseLeaveOrUp);
		wrapper.addEventListener('mouseup', handleMouseLeaveOrUp);
		wrapper.addEventListener('mousemove', handleMouseMove);
		wrapper.addEventListener('touchstart', handleTouchStart, {
			passive: false,
		});
		wrapper.addEventListener('touchmove', handleTouchMove, {
			passive: false,
		});
		wrapper.addEventListener('touchend', handleTouchEnd);

		return () => {
			wrapper.removeEventListener('mousedown', handleMouseDown);
			wrapper.removeEventListener('mouseleave', handleMouseLeaveOrUp);
			wrapper.removeEventListener('mouseup', handleMouseLeaveOrUp);
			wrapper.removeEventListener('mousemove', handleMouseMove);
			wrapper.removeEventListener('touchstart', handleTouchStart);
			wrapper.removeEventListener('touchmove', handleTouchMove);
			wrapper.removeEventListener('touchend', handleTouchEnd);
		};
	}, [documentUploadStatus, updateCanvasScale, cursorMode]);

	if (documentUploadStatus === DOCUMENT_UPLOAD_STATUS.LOADED_IN_EDITOR)
		return (
			<div className='w-full flex h-full bg-[transparent]'>
				<CustomCursor toolbarBtn={activeToolbarBtn} />

				<motion.div
					key='pdfViewer'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.3, ease: 'easeOut' }}
					className='pdf-container flex relative flex-1 bg-[transparent]'
				>
					<motion.div className='relative my-4 w-full bg-[transparent]'>
						<PdfLoader
							url={url}
							beforeLoad={
								<div className='w-full h-full flex items-center justify-center'>
									<p className=''>loading</p>
								</div>
							}
						>
							{(pdfDocument) => (
								<PdfHighlighter
									pdfDocument={pdfDocument}
									enableAreaSelection={(event) =>
										event.altKey
									}
									onScrollChange={() => null}
									scrollRef={() => {
										// scrollViewerTo.current = scrollTo;
										// scrollToHighlightFromHash();
									}}
									onSelectionFinished={
										(
											position,
											content,
											hideTipAndSelection
										) =>
											activeToolbarBtn?.id ===
												TOOLBAR_BTNS.HIGHLIGHT && (
												<button
													onClick={() => {
														addHighlight({
															content,
															position,
															comment: {
																emoji: '',
																text: '',
																color: '#ca2a30',
															},
														});
														hideTipAndSelection();
													}}
													className='px-3 py-1.5 bg-primary text-white rounded-md cursor-pointer'
												>
													<div className='flex items-center gap-2'>
														<Highlighter
															strokeWidth={1.5}
															style={{
																width: '1.5rem',
																height: '1.5rem',
															}}
															className='text-white/70'
														/>

														<p className='text-sm pr-1'>
															Highlight
														</p>
													</div>
												</button>
											)
										// <Tip
										// 	onOpen={transformSelection}

										// 	onConfirm={(comment) => {
										// 		addHighlight({
										// 			content,
										// 			position,
										// 			comment,
										// 		});
										// 		hideTipAndSelection();
										// 	}}
										// />
									}
									highlightTransform={(
										highlight,
										index,
										setTip,
										hideTip,
										viewportToScaled,
										screenshot,
										isScrolledTo
									) => {
										const isTextHighlight =
											!highlight.content?.image;

										const component = isTextHighlight ? (
											<Highlight
												isScrolledTo={isScrolledTo}
												position={highlight.position}
												comment={highlight.comment}
											/>
										) : (
											<AreaHighlight
												isScrolledTo={isScrolledTo}
												highlight={highlight}
												onChange={(boundingRect) => {
													updateHighlight(
														highlight.id,
														{
															boundingRect:
																viewportToScaled(
																	boundingRect
																),
														},
														{
															image: screenshot(
																boundingRect
															),
														}
													);
												}}
											/>
										);

										return (
											<Popup
												popupContent={
													<HighlightPopup
														{...highlight}
													/>
												}
												onMouseOver={(popupContent) =>
													setTip(
														highlight,
														() => popupContent
													)
												}
												onMouseOut={hideTip}
												key={index}
											>
												{component}
											</Popup>
										);
									}}
									highlights={documentProps.highlights}
									pdfScaleValue={canvasScale.toString()}
								/>
							)}
						</PdfLoader>

						{/* <Document
							file={file}
							options={pdfViewerOptions}
							onLoadSuccess={handleLoadSuccess}
							className={'relative overflow-hidden'}
						>
							{documentProps.elements.map(
								({ id, pos, start, page }) =>
									page === currentPage && (
										<FloatingTextEditor
											key={id}
											pos={pos}
											start={start}
											onUpdate={(params) =>
												updateDocumentProps((prev) => ({
													...prev,
													elements: prev.elements.map(
														(element) => {
															if (
																element.id !==
																id
															)
																return element;
															return {
																...element,
																...params,
															};
														}
													),
												}))
											}
										>
											<p>Hey</p>
										</FloatingTextEditor>
									)
							)}
							<Page
								canvasBackground='transparent'
								scale={canvasScale}
								pageNumber={currentPage}
								renderMode='canvas'
								className={'flex items-center justify-center'}
								rotate={documentProps.rotate}
							/>
						</Document> */}
					</motion.div>
				</motion.div>
			</div>
		);
}
