import Avatar, { AvatarProps } from '@mui/material/Avatar';

interface LettersAvatarI {
    text: string;
    size?: number;
}

export default function LettersAvatar({ text, size }: LettersAvatarI) {

    function stringToColor(string: string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name: string): AvatarProps {
        return {
            sx: (themeParams) => ({
                color: themeParams.palette.getContrastText(stringToColor(name)),
                bgcolor: stringToColor(name),
                height: size || 40,
                width: size || 40,
            }),
            children: `${name.split(' ')[0][0].toUpperCase()}${name.split(' ')[name.split(' ').length - 1][0].toUpperCase()}`,
        };
    }

    return (
        <Avatar {...stringAvatar(text)} />
    );
}
