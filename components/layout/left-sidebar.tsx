'use client';
import React from 'react';
import {
	ChevronFirst,
	Highlighter,
	MessageSquareText,
	NotebookPen,
	Signature,
	Underline,
} from 'lucide-react';
import Tooltip from '@/components/common/tooltip';
import { useViewerContext } from './context';

interface MenuButtonProps {
	icon: React.ReactNode;
	title?: string;
	onClick?: () => void;
}

function MenuButton({ icon, title, onClick }: MenuButtonProps) {
	return (
		<button
			className='cursor-pointer flex items-center flex-col group'
			onClick={onClick}
		>
			<div className='group-hover:bg-[#e2e8ed] w-[40px] aspect-square flex items-center justify-center rounded-md'>
				{icon}
			</div>
			{title && <p className='text-sm'>{title}</p>}
		</button>
	);
}

export default function LeftSidebar() {
	const { onFocusModeToggle, isFocusModeEnabled } = useViewerContext();
	return (
		<div className='p-1 flex flex-col gap-4 items-center'>
			<MenuButton
				icon={
					<NotebookPen
						size={'1.5rem'}
						strokeWidth={1.25}
						style={{ width: '1.5rem', height: '1.5rem' }}
					/>
				}
				title='Anotate'
			/>

			<MenuButton
				icon={
					<Signature
						size={'1.5rem'}
						strokeWidth={1.25}
						style={{ width: '1.5rem', height: '1.5rem' }}
					/>
				}
				title='Signnature'
			/>

			<MenuButton
				icon={
					<Underline
						size={'1.5rem'}
						strokeWidth={1.25}
						style={{ width: '1.5rem', height: '1.5rem' }}
					/>
				}
				title='Underline'
			/>

			<MenuButton
				icon={
					<Highlighter
						size={'1.5rem'}
						strokeWidth={1.25}
						style={{ width: '1.5rem', height: '1.5rem' }}
					/>
				}
				title='Highlight'
			/>

			<MenuButton
				icon={
					<MessageSquareText
						size={'1.5rem'}
						strokeWidth={1.25}
						style={{ width: '1.5rem', height: '1.5rem' }}
					/>
				}
				title='Comment'
			/>

			<div className='mt-auto pb-4'>
				<MenuButton
					onClick={onFocusModeToggle}
					icon={
						<Tooltip
							content={
								isFocusModeEnabled
									? 'Disable focus mode'
									: 'Enable focus mode'
							}
							side='right'
							sideOffset={20}
						>
							<ChevronFirst
								size={'1.5rem'}
								strokeWidth={1.25}
								style={{
									width: '1.5rem',
									height: '1.5rem',
									transform: !isFocusModeEnabled
										? 'rotate(-180deg)'
										: undefined,
									transition: 'ease all 0.5s',
								}}
							/>
						</Tooltip>
					}
				/>
			</div>
		</div>
	);
}
