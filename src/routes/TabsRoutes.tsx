import { useLocation, Outlet } from 'react-router-dom';
//
import useMobile from '../hooks/useMobile';
//
import { Box, Tabs } from '@mui/material';
//
import LinkTabMui from '../components/LinkTabMui';
//

export default function TabsRoutes({ links }: { links: { label: string, value: string, render?: boolean }[] }) {

    const isMobile = useMobile();

    const location = useLocation();
    const selectedTab = location.pathname.split('/')[location.pathname.split('/').length - 1];

    return (
        <Box>
            <Tabs
                value={selectedTab}
                aria-label={`Tabs_${location.pathname}`}
                variant={(isMobile && links.length <= 2) ? 'fullWidth' : 'standard'}
            >
                {links.map(link => {
                    if (link.render === false) return null;
                    return <LinkTabMui key={link.value} label={link.label} value={link.value} />;
                })}
            </Tabs>
            <Outlet />
        </Box>
    );
}
