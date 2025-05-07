import React from 'react';
import IconButton from '@/components/common/icon-button';
import {
	ChevronFirst,
	Download,
	Highlighter,
	NotebookPen,
	Printer,
	Search,
	Signature,
	Underline,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Tooltip from '@/components/common/tooltip';

interface MenuButtonProps {
	icon: React.ReactNode;
	title?: string;
}

function MenuButton({ icon, title }: MenuButtonProps) {
	return (
		<button className='cursor-pointer flex items-center flex-col group'>
			<div className='group-hover:bg-[#e2e8ed] w-[40px] aspect-square flex items-center justify-center rounded-md'>
				{icon}
			</div>
			{title && <p className='text-sm'>{title}</p>}
		</button>
	);
}

export default function LeftSidebar() {
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

			<div className='mt-auto pb-4'>
				<MenuButton
					icon={
						<Tooltip
							content='Focus mode'
							side='right'
							sideOffset={20}
						>
							<ChevronFirst
								size={'1.5rem'}
								strokeWidth={1.25}
								style={{ width: '1.5rem', height: '1.5rem' }}
							/>
						</Tooltip>
					}
				/>
			</div>
		</div>
	);
}
