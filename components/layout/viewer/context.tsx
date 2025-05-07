/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as React from 'react';

export interface ViewerContextValue {}

export const ViewerContext = React.createContext<ViewerContextValue>({});

interface ViewerContextProviderProps {
	children: React.ReactNode;
}

export default function ViewerContextProvider({
	children,
}: ViewerContextProviderProps): React.JSX.Element {
	const [data, setData] = React.useState<[]>([]);

	return (
		<ViewerContext.Provider value={{}}>{children}</ViewerContext.Provider>
	);
}

export function useViewerContext(): ViewerContextValue {
	return React.useContext(ViewerContext);
}
