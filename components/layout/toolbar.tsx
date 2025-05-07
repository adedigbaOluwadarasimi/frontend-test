'use client';
import React from 'react';
import Tooltip from '../common/tooltip';
import IconButton from '../common/icon-button';
import {
	ChevronDown,
	Hand,
	MousePointer2,
	Redo2,
	RedoDot,
	StickyNote,
	Undo2,
	UndoDot,
	ZoomIn,
	ZoomOut,
} from 'lucide-react';
import { useViewerContext } from './context';
import { Separator } from '../ui/separator';

export default function ToolBar() {
	const { onFutureFeatClick } = useViewerContext();
	return (
		<div className='h-[48px] p-[8px] flex items-center justify-between'>
			<div className='flex items-center gap-0.5'>
				<Tooltip
					content='Thumbnails'
					side='bottom'
					sideOffset={10}
				>
					<IconButton
						onClick={onFutureFeatClick}
						className='p-2 hover:bg-[#dae1e8]'
						style={{ aspectRatio: 'auto' }}
					>
						<div className='flex items-center gap-1'>
							<StickyNote
								strokeWidth={1.25}
								style={{ width: '1.5rem', height: '1.5rem' }}
								color='#325167'
							/>

							<ChevronDown />
						</div>
					</IconButton>
				</Tooltip>

				<Separator
					className='bg-[#a5b5c1] min-h-[15px] mx-2'
					orientation='vertical'
				/>

				<Tooltip
					content='Zoom out'
					side='bottom'
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
					side='bottom'
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

				<Tooltip
					content='Rotate left'
					side='bottom'
					sideOffset={10}
				>
					<IconButton
						onClick={onFutureFeatClick}
						className='p-2 hover:bg-[#dae1e8]'
					>
						<UndoDot
							strokeWidth={1.25}
							style={{ width: '1.5rem', height: '1.5rem' }}
							color='#325167'
						/>
					</IconButton>
				</Tooltip>

				<Tooltip
					content='Rotate right'
					side='bottom'
					sideOffset={10}
				>
					<IconButton
						onClick={onFutureFeatClick}
						className='p-2 hover:bg-[#dae1e8]'
					>
						<RedoDot
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

				<Tooltip
					content='Pan'
					side='bottom'
					sideOffset={10}
				>
					<IconButton
						onClick={onFutureFeatClick}
						className='p-2 hover:bg-[#dae1e8]'
					>
						<MousePointer2
							strokeWidth={1.25}
							style={{ width: '1.5rem', height: '1.5rem' }}
							color='#325167'
						/>
					</IconButton>
				</Tooltip>

				<Tooltip
					content='Pan'
					side='bottom'
					sideOffset={10}
				>
					<IconButton
						onClick={onFutureFeatClick}
						className='p-2 hover:bg-[#dae1e8]'
					>
						<Hand
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

				<Tooltip
					content='Undo'
					side='bottom'
					sideOffset={10}
				>
					<IconButton
						onClick={onFutureFeatClick}
						disabled
						className='p-1 hover:bg-[#dae1e8]'
					>
						<Undo2
							strokeWidth={1.25}
							style={{ width: '1.5rem', height: '1.5rem' }}
							color='#325167'
						/>
					</IconButton>
				</Tooltip>

				<Tooltip
					content='Redo'
					side='bottom'
					sideOffset={10}
				>
					<IconButton
						onClick={onFutureFeatClick}
						disabled
						className='p-1 hover:bg-[#dae1e8]'
					>
						<Redo2
							strokeWidth={1.25}
							style={{ width: '1.5rem', height: '1.5rem' }}
							color='#325167'
						/>
					</IconButton>
				</Tooltip>
			</div>

			<div>
				<p>Selected toolbar</p>
			</div>
		</div>
	);
}
