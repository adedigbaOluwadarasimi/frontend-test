import IconButton from '@/components/common/icon-button';
import React from 'react';
import { Download, Printer, Search } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Tooltip from '@/components/common/tooltip';

export default function RightSidebar() {
	return (
		<div className='p-1 flex flex-col gap-3'>
			<Tooltip
				content='Search'
				side='left'
				sideOffset={10}
			>
				<IconButton>
					<Search
						size={'1.5rem'}
						strokeWidth={1.25}
						style={{ width: '1.5rem', height: '1.5rem' }}
					/>
				</IconButton>
			</Tooltip>

			<Separator orientation='horizontal' />

			<Tooltip
				content='Download'
				side='left'
				sideOffset={10}
			>
				<IconButton>
					<Download
						strokeWidth={1.25}
						style={{ width: '1.5rem', height: '1.5rem' }}
					/>
				</IconButton>
			</Tooltip>

			<Tooltip
				content='Print'
				side='left'
				sideOffset={10}
			>
				<IconButton>
					<Printer
						strokeWidth={1.25}
						style={{ width: '1.5rem', height: '1.5rem' }}
					/>
				</IconButton>
			</Tooltip>
		</div>
	);
}
