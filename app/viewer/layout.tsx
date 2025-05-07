import ViewerLayout from '@/components/layout/viewer/layout';
import { LayoutProps } from '@/lib/types/layout';

export default function Layout(props: LayoutProps) {
	return <ViewerLayout {...props} />;
}
