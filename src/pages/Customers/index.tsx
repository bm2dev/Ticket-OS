import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
//
import { AuthContext } from '../../context/Auth';
//
import { Button, Fab, IconButton, Stack } from '@mui/material';
//
import DefaultContainer from '../../components/DefaultContainer';
import DataGridMui from '../../components/DataGridMui';
import TooltipMui from '../../components/TooltipMui';
//
import { HiPencilAlt } from 'react-icons/hi';
import { IoAdd, IoReload } from 'react-icons/io5';
//
import { TicketType } from '../../types';
import useFirestore from '../../hooks/useFirestore';
import useLocale from '../../hooks/useLocale';

export default function Customers() {

  const navigate = useNavigate();
  const { localetext } = useLocale();
  const { getDocs } = useFirestore();

  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<TicketType[] | any[]>([]);

  async function getCustomers() {
    setLoading(true);
    try {
      let data = await getDocs('clients');
      setCustomers(data);
      setLoading(false);
      return;

    } catch (error) {
      console.log(error);
      toast.error(localetext.pages.Customers.functions.getCustomers.errorToastText);
      setLoading(false);
    }
  }

  useEffect(() => { getCustomers() }, [])

  return (
    <DefaultContainer
      title={localetext.pages.Customers.defaultContainerTitle}
      subtitle={localetext.pages.Customers.defaultContainerSubtitle}
    >
      <Stack direction='row' sx={{ my: 2 }}>
        <Button
          variant='contained'
          color='primary'
          aria-label='add_button'
          onClick={() => navigate('add')}
          endIcon={<IoAdd />}
        >
          {localetext.pages.Customers.addButton}
        </Button>
      </Stack>

      <DataGridMui
        loading={loading}
        disableSelectionOnClick
        sx={{ bgcolor: 'background.paper', height: 600 }}
        rows={customers}
        columnVisibilityModel={{ actions: user?.accessLevel === 1 }}
        columns={[
          { field: 'name', headerName: localetext.pages.Customers.DataGridMui.nameColumn.headerName, minWidth: 200, flex: 1 },
          { field: 'email', headerName: localetext.pages.Customers.DataGridMui.emailColumn.headerName, minWidth: 200, flex: 1 },
          {
            field: 'actions', headerName: localetext.pages.Customers.DataGridMui.actionsColumn.headerName, type: 'actions',
            width: 150, headerAlign: 'center', align: 'center',
            renderCell: params => (<>
              <TooltipMui title='Editar Cliente' placement='top'>
                <IconButton
                  aria-label='edit_client_button'
                  onClick={() => navigate(`edit/${params.row.id}`)}
                  color='primary'
                >
                  <HiPencilAlt />
                </IconButton>
              </TooltipMui>
            </>)
          },
        ]}
      />

      <TooltipMui
        title={localetext.pages.Customers.refreshButtonTooltipTitle}
        placement='top'
      >
        <Fab
          sx={{ position: 'fixed', bottom: 16, right: 16, fontSize: 20 }}
          size='small'
          aria-label='reload-button'
          onClick={getCustomers}
        >
          <IoReload />
        </Fab>
      </TooltipMui>

    </DefaultContainer>
  )
}
