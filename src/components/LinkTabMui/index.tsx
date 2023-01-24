import { useNavigate } from 'react-router-dom';
//
import { Tab, TabProps } from '@mui/material';

interface LinkTabProps extends TabProps {
    onClick?: () => void;
}

export default function LinkTabMui({ icon, iconPosition, label, value, onClick, ...props }: LinkTabProps) {

    const navigate = useNavigate();

    function handleClick() {
        navigate(value);
        onClick && onClick();
    }

    return (
        <Tab
            icon={icon}
            iconPosition={iconPosition}
            label={label}
            onClick={handleClick}
            value={value}
            {...props}
        />
    );
}