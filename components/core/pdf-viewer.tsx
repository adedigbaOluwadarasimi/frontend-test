'use client';
import { useEffect, useMemo } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { useViewerContext } from '../layout/context';
import { motion } from 'motion/react';
import { DOCUMENT_UPLOAD_STATUS } from '@/lib/enums';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	'pdfjs-dist/build/pdf.worker.min.mjs',
	import.meta.url
).toString();

export function PdfViewer() {
	const {
		document: file,
		documentUploadStatus,
		canvasScale,
		updateCanvasScale,
		cursorMode,
		currentPage,
		updatePageCount,
		documentProps,
	} = useViewerContext();

	const handleLoadSuccess = ({ numPages }: { numPages: number }) => {
		updatePageCount(numPages);
	};

	const pdfViewerOptions = useMemo(
		() => ({
			cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
			standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
		}),
		[]
	);

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
				<motion.div
					key='pdfViewer'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.3, ease: 'easeOut' }}
					className='pdf-container m-auto h-fit w-fit bg-[transparent] p-10'
				>
					<motion.div>
						<Document
							file={file}
							options={pdfViewerOptions}
							onLoadSuccess={handleLoadSuccess}
						>
							<Page
								canvasBackground='transparent'
								scale={canvasScale}
								pageNumber={currentPage}
								renderMode='canvas'
								className={'flex items-center justify-center'}
								rotate={documentProps.rotate}
                
							/>
						</Document>
					</motion.div>
				</motion.div>
			</div>
		);
}
