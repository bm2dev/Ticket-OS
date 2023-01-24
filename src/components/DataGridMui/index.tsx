import useMobile from '../../hooks/useMobile';
import {
    GridToolbarDensitySelector,
    GridToolbarColumnsButton,
    GridToolbarQuickFilter,
    GridToolbarContainer,
    DataGridProps,
    DataGrid,
    ptBR,
} from '@mui/x-data-grid';

export default function DataGridMui({ ...props }: DataGridProps) {

    const isMobile = useMobile();

    return (
        <DataGrid
            components={{
                Toolbar: () =>
                    <GridToolbarContainer>
                        <GridToolbarColumnsButton color='inherit' onResize={undefined} nonce={undefined} onResizeCapture={undefined} />
                        <GridToolbarDensitySelector color='inherit' onResize={undefined} nonce={undefined} onResizeCapture={undefined} />
                        <GridToolbarQuickFilter sx={{ ml: 'auto', width: isMobile ? '100%' : 250 }} onResize={undefined} nonce={undefined} onResizeCapture={undefined} />
                    </GridToolbarContainer>
            }}
            componentsProps={{ toolbar: { quickFilterProps: { debounceMs: 500 } } }}
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            disableColumnMenu
            {...props}
        />
    )
}