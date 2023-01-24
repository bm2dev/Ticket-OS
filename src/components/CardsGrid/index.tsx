import { ReactElement } from 'react';
//
import {
    Typography,
    Skeleton,
    Divider,
    Paper,
    Grid,
} from '@mui/material';

interface CardsGridProps {
    loading?: boolean,
    object: { [key: string]: any } | null,
    cards: {
        field: string,
        headerName: string,
        headerIcon?: ReactElement,
        fullWidth?: boolean,
        halfWidth?: boolean,
        render?: boolean,
        renderCell?: (value: any) => JSX.Element,
        valueFormatter?: (value: any) => any,
    }[]
}

export default function CardsGrid({ loading, object, cards }: CardsGridProps) {
    if (loading === true || object === null) {
        return (
            <Grid sx={{ pt: 2 }} container spacing={4}>
                {cards.map((params, index) => {
                    if (params.render === false) return null;

                    return (
                        <Grid key={index} item xs={12} md={params.fullWidth === true ? 12 : 6} lg={params.fullWidth === true ? 12 : params.halfWidth === true ? 6 : 4}>
                            <Skeleton sx={{ fontSize: 18 }} variant='text' />
                            <Divider sx={{ my: 1 }} />
                            <Skeleton sx={{ fontSize: 16 }} variant='text' />
                        </Grid>
                    )
                })}
            </Grid>
        )
    }

    return (
        <Grid sx={{ pt: 2 }} container spacing={4}>
            {cards.map((params, index) => {
                if (params.render === false) return null;

                return (
                    <Grid key={index} item xs={12} md={params.fullWidth === true ? 12 : 6} lg={params.fullWidth === true ? 12 : params.halfWidth === true ? 6 : 4}>
                        <Grid container alignItems='center' spacing={1}>
                            {params.headerIcon &&
                                <Grid item sx={{ fontSize: 25, display: 'flex', alignItems: 'center' }} xs={1}>
                                    {params.headerIcon}
                                </Grid>
                            }
                            <Grid item xs>
                                <Typography variant='h6' fontSize={18}>
                                    {params.headerName}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider sx={{ my: 1 }} />
                        <>
                            {!params.renderCell
                                ?
                                <Typography sx={{ wordWrap: 'break-word' }} variant='body1' fontWeight={400}>
                                    {params.valueFormatter
                                        ? params.valueFormatter(object[params.field])
                                        : object[params.field]
                                    }
                                </Typography>
                                :
                                params.renderCell(object[params.field])
                            }
                        </>
                    </Grid>
                )
            })}
        </Grid>
    )
}