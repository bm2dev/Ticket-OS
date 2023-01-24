
import { ReactElement } from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import {
    useLocation,
    useNavigate
} from 'react-router-dom';

interface ListItemLinkProps {
    icon?: ReactElement;
    label: string;
    to: string;
    onClick?: () => void;
}

export default function ListItemLink({ icon, label, to, onClick }: ListItemLinkProps) {

    const location = useLocation();
    const navigate = useNavigate();
    const activeLink = location.pathname === to;

    function handleClick() {
        navigate(to);
        onClick && onClick();
    }

    return (
        <ListItemButton
            sx={{ color: activeLink ? 'primary.main' : 'text.secondary' }}
            onClick={handleClick}
        >
            {icon &&
                <ListItemIcon sx={{ color: 'currentcolor', fontSize: 20 }}>
                    {icon}
                </ListItemIcon>
            }
            <ListItemText>{label}</ListItemText>
        </ListItemButton>
    );
}

