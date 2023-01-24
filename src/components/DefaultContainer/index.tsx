import { Container, ContainerProps, Typography, Divider } from '@mui/material';
import { Fragment } from 'react';

interface DefaultContainerProps extends ContainerProps {
    title?: string,
    subtitle?: string | string[],
}

export default function DefaultContainer({ children, title, subtitle, ...props }: DefaultContainerProps) {
    return (
        <Container sx={{ pt: 5, pb: 10 }} maxWidth='xl' {...props}>
            {title &&
                <Typography
                    variant='h4'
                    fontWeight={600}
                >
                    {title}
                </Typography>
            }
            {subtitle &&
                <Typography
                    variant='subtitle1'
                    color='text.secondary'
                >
                    {typeof subtitle === 'string'
                        ? subtitle
                        : subtitle.map(phrase => <Fragment key={phrase}>{phrase}<br /></Fragment>)
                    }
                </Typography>
            }
            {(title !== undefined || subtitle !== undefined) && <Divider sx={{ my: 2 }} />}
            {children}
        </Container>
    )
}
