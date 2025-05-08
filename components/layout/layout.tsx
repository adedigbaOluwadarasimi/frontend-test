'use client';
import { LayoutProps } from '@/lib/types/layout';
import React from 'react';
import Header from './header';
import LeftSidebar from './left-sidebar';
import RightSidebar from './right-sidebar';
import ToolBar from './toolbar';
import ViewerContextProvider from './context';
import FloatingToolbar from './floating-toolbar';
import ChildWrapper from './child-wrapper';

export default function ViewerLayout({ children }: LayoutProps) {
	return (
		<ViewerContextProvider>
			<div className='w-screen overflow-x-hidden min-h-sceen flex flex-col bg-[#f1f5f8]'>
				<Header />
				<div className='grid grid-cols-[80px_1fr_50px] w-screen min-h-[calc(100vh-56px)]'>
					<LeftSidebar />
					<div className='flex relative h-full max-w-[calc(100vw-130px)] flex-col rounded-t-[16px] border-[#e8eef3] border bg-[#e8eef3]'>
						<ToolBar />
						<div className='flex border border-[#e8eef3] rounded-t-[8px] overflow-hidden h-[calc(100vh-106px)] bg-[#fff]'>
							<ChildWrapper>{children}</ChildWrapper>
						</div>
						<FloatingToolbar />
					</div>
					<RightSidebar />
				</div>
			</div>
		</ViewerContextProvider>
	);
}
