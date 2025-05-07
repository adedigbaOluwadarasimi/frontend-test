import { LayoutProps } from '@/lib/types/layout';
import React from 'react';
import Header from './header';
import LeftSidebar from './left-sidebar';
import RightSidebar from './right-sidebar';
import ToolBar from './toolbar';
import ViewerContextProvider from './context';
import FloatingToolbar from './floating-toolbar';

export default function ViewerLayout({ children }: LayoutProps) {
	return (
		<ViewerContextProvider>
			<div className='w-screen min-h-sceen flex flex-col bg-[#f1f5f8]'>
				<Header />
				<div className='grid grid-cols-[80px_1fr_50px] min-h-[calc(100vh-56px)]'>
					<LeftSidebar />
					<div className='flex relative h-full flex-col rounded-t-[16px] border-[#e8eef3] border bg-[#e8eef3]'>
						<ToolBar />
						<div className='bg-[#fff] flex-1 flex h-full border border-[#e8eef3] rounded-t-[8px] pt-4 pb-12'>
							{children}
						</div>

						<FloatingToolbar />
					</div>
					<RightSidebar />
				</div>
			</div>
		</ViewerContextProvider>
	);
}
