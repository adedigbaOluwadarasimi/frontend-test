'use client';
import React from 'react';
import { useViewerContext } from './context';
import Tooltip from '../common/tooltip';
import IconButton from '../common/icon-button';
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	ZoomIn,
	ZoomOut,
} from 'lucide-react';
import { Separator } from '../ui/separator';

export default function FloatingToolbar() {
	const { onFutureFeatClick } = useViewerContext();
	return (
		<div className='px-2 py-2 absolute flex items-center bottom-5 left-1/2 -translate-x-1/2 bg-[#fff] shadow-lg rounded-md border border-[0.5px] border-black/10 bg-white/30 backdrop-blur-md'>
			<div className='flex items-center gap-0.5'>
				<Tooltip
					content='Zoom out'
					side='top'
					sideOffset={10}
				>
					<IconButton
						onClick={onFutureFeatClick}
						className='p-2 hover:bg-[#dae1e8]'
					>
						<ZoomOut
							strokeWidth={1.25}
							style={{ width: '1.5rem', height: '1.5rem' }}
							color='#325167'
						/>
					</IconButton>
				</Tooltip>

				<Tooltip
					content='Zoom in'
					side='top'
					sideOffset={10}
				>
					<IconButton
						onClick={onFutureFeatClick}
						className='p-2 hover:bg-[#dae1e8]'
					>
						<ZoomIn
							strokeWidth={1.25}
							style={{ width: '1.5rem', height: '1.5rem' }}
							color='#325167'
						/>
					</IconButton>
				</Tooltip>

				<Separator
					className='bg-[#a5b5c1] min-h-[15px] mx-2'
					orientation='vertical'
				/>

				<IconButton
					onClick={onFutureFeatClick}
					className='p-2 hover:bg-[#dae1e8]'
				>
					<ChevronsLeft
						strokeWidth={1.25}
						style={{ width: '1.5rem', height: '1.5rem' }}
						color='#325167'
					/>
				</IconButton>

				<IconButton
					onClick={onFutureFeatClick}
					className='p-2 hover:bg-[#dae1e8]'
				>
					<ChevronLeft
						strokeWidth={1.25}
						style={{ width: '1.5rem', height: '1.5rem' }}
						color='#325167'
					/>
				</IconButton>

				<IconButton
					onClick={onFutureFeatClick}
					className='p-2 hover:bg-[#dae1e8]'
				>
					<ChevronRight
						strokeWidth={1.25}
						style={{ width: '1.5rem', height: '1.5rem' }}
						color='#325167'
					/>
				</IconButton>

				<IconButton
					onClick={onFutureFeatClick}
					className='p-2 hover:bg-[#dae1e8]'
				>
					<ChevronsRight
						strokeWidth={1.25}
						style={{ width: '1.5rem', height: '1.5rem' }}
						color='#325167'
					/>
				</IconButton>
			</div>
		</div>
	);
}
