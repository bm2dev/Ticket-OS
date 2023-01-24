import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';
//
import useFirestore from '../../hooks/useFirestore';
import useLocale from '../../hooks/useLocale';
//
import { sort } from '../../functions/sort';
//
import { AuthContext } from '../../context/Auth';
//
import { Button, Fab, IconButton, Stack, Typography } from '@mui/material';
//
import DefaultContainer from '../../components/DefaultContainer';
import DataGridMui from '../../components/DataGridMui';
import TooltipMui from '../../components/TooltipMui';
//
import { HiPencilAlt, HiSearch } from 'react-icons/hi';
import { IoAdd, IoReload } from 'react-icons/io5';
//
import { TicketType } from '../../types';

export default function Tickets() {

  const { localetext } = useLocale();

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { editDoc, getDocs } = useFirestore();

  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<TicketType[] | any[]>([]);

  async function getTickets() {
    setLoading(true);
    try {
      let data = await getDocs('tickets');
      setTickets(sort(data, 'createdAt', { desc: true }));
      setLoading(false);

    } catch (error) {
      console.log(error);
      toast.error(localetext.pages.Tickets.functions.getTickets.errorToastText);
      setLoading(false);
    }
  }

  async function editStatus(newRow: { [key: string]: any }) {
    setLoading(true);
    try {
      await editDoc('tickets', newRow.id, newRow);
      setLoading(false);

    } catch (error) {
      console.log(error);
      toast.error(localetext.pages.Tickets.functions.editStatus.errorToastText);
      setLoading(false);
    }
  }

  useEffect(() => { getTickets() }, [])

  return (
    <DefaultContainer
      title={localetext.pages.Tickets.defaultContainerTitle}
      subtitle={localetext.pages.Tickets.defaultContainerSubtitle}
    >

      <Stack direction='row' sx={{ my: 2 }}>
        <Button
          variant='contained'
          color='primary'
          aria-label='add_button'
          onClick={() => navigate('add')}
          endIcon={<IoAdd />}
        >
          {localetext.pages.Tickets.addButton}
        </Button>
      </Stack>

      <Typography variant='caption' color='text.secondary'>
        {localetext.pages.Tickets.obsText}
      </Typography>

      <DataGridMui
        loading={loading}
        disableSelectionOnClick
        sx={{ mt: 1, bgcolor: 'background.paper', height: 600 }}
        rows={tickets}
        processRowUpdate={(newRow, oldRow) => {
          if (newRow.status !== oldRow.status) {
            editStatus({ ...newRow, updatedAt: moment().format() });
            return { ...newRow, updatedAt: moment().format() };
          };

          return oldRow;
        }}
        experimentalFeatures={{ newEditingApi: true }}
        columns={[
          { field: 'clientName', headerName: localetext.pages.Tickets.DataGridMui.clientNameColumn.headerName, minWidth: 200, flex: 1 },
          { field: 'subject', headerName: localetext.pages.Tickets.DataGridMui.subjectColumn.headerName, minWidth: 200, flex: 1 },
          {
            field: 'createdAt', headerName: localetext.pages.Tickets.DataGridMui.createdAtColumn.headerName, width: 140,
            valueFormatter: params => moment(params.value).format('L')
          },
          {
            field: 'updatedAt', headerName: localetext.pages.Tickets.DataGridMui.updatedAtColumn.headerName, width: 170,
            valueFormatter: params => moment(params.value).calendar()
          },
          {
            field: 'status', headerName: localetext.pages.Tickets.DataGridMui.statusColumn.headerName, width: 170,
            type: 'singleSelect',
            valueOptions: [
              { value: 0, label: localetext.pages.Tickets.DataGridMui.statusColumn.valueOptions.value0Label },
              { value: 1, label: localetext.pages.Tickets.DataGridMui.statusColumn.valueOptions.value1Label },
              { value: 2, label: localetext.pages.Tickets.DataGridMui.statusColumn.valueOptions.value2Label }
            ],
            editable: true,
            renderCell: params => (<>
              <Typography
                sx={{
                  color: params.row.status === 1 ? 'success.contrastText' : params.row.status === 2 ? 'warning.contrastText' : 'error.contrastText',
                  bgcolor: params.row.status === 1 ? 'success.main' : params.row.status === 2 ? 'warning.main' : 'error.main',
                  flexGrow: 1,
                  borderRadius: 1,
                  textAlign: 'center',
                  fontWeight: 500,
                }}
              >
                {params.row.status === 1
                  ? localetext.pages.Tickets.DataGridMui.statusColumn.valueOptions.value1Label
                  : params.row.status === 2
                    ? localetext.pages.Tickets.DataGridMui.statusColumn.valueOptions.value2Label
                    : localetext.pages.Tickets.DataGridMui.statusColumn.valueOptions.value0Label
                }
              </Typography>
            </>)
          },
          {
            field: 'actions', headerName: localetext.pages.Tickets.DataGridMui.actionsColumn.headerName, type: 'actions',
            width: 150, headerAlign: 'center', align: 'center',
            renderCell: params => (<>
              <TooltipMui title='Detalhes' placement='top'>
                <IconButton
                  aria-label='ticket_info'
                  onClick={() => navigate(`info/${params.row.id}`)}
                  color='info'
                >
                  <HiSearch />
                </IconButton>
              </TooltipMui>

              {user?.accessLevel === 1 &&
                <TooltipMui title='Editar Chamado' placement='top'>
                  <IconButton
                    aria-label='edit_ticket_button'
                    onClick={() => navigate(`edit/${params.row.id}`)}
                    color='primary'
                  >
                    <HiPencilAlt />
                  </IconButton>
                </TooltipMui>
              }
            </>)
          },
        ]}
      />

      <TooltipMui
        title={localetext.pages.Tickets.refreshButtonTooltipTitle}
        placement='top'
      >
        <Fab
          sx={{ position: 'fixed', bottom: 16, right: 16, fontSize: 20 }}
          size='small'
          aria-label='reload-button'
          onClick={getTickets}
        >
          <IoReload />
        </Fab>
      </TooltipMui>

    </DefaultContainer>
  )
}
