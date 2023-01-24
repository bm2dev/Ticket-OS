import { Outlet } from 'react-router-dom';
import { useState } from 'react';
//
import useMobile from '../hooks/useMobile';
//
import { Box } from '@mui/material';
//
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function SidebarRoutes() {

    const isMobile = useMobile();

    const [navOpen, setNavOpen] = useState(false);

    const drawerWidth = '240px';

    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                height: 'auto',
                width: '100%',
                pl: isMobile ? '0px' : drawerWidth,
            }}
        >
            <Sidebar {...{ drawerWidth, navOpen, setNavOpen }} />
            <Navbar {...{ setNavOpen }} />
            <Outlet />
        </Box>
    );
}