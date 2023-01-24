import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';
//
import useFirestore from '../../hooks/useFirestore';
import useLocale from '../../hooks/useLocale';
//
import { Divider, Typography } from '@mui/material';
//
import DefaultContainer from '../../components/DefaultContainer';
import CardsGrid from '../../components/CardsGrid';
//
import { MdAccessTime, MdCalendarToday, MdPerson, MdSearch } from 'react-icons/md';

export default function TicketInfo() {

  const { localetext } = useLocale();
  const { ticketId } = useParams();

  const { getDoc } = useFirestore();

  const [loadingPage, setLoadingPage] = useState(true);
  const [ticket, setTicket] = useState<{ [key: string]: any } | null>(null);

  useEffect(() => {
    async function getTicketInfo() {
      setLoadingPage(true);
      try {
        let data2 = await getDoc('tickets', ticketId || '');
        if (!data2) return toast.error(localetext.pages.TicketInfo.functions.getTicketInfo.errorToastTextNotFound);
        setTicket(data2);
        setLoadingPage(false);

      } catch (error) {
        console.log(error);
        toast.error(localetext.pages.TicketInfo.functions.getTicketInfo.errorToastText);
      }
    }
    getTicketInfo();
  }, [])

  return (
    <DefaultContainer
      title={localetext.pages.TicketInfo.defaultContainerTitle}
    >
      <CardsGrid
        loading={loadingPage}
        object={ticket}
        cards={[
          {
            field: 'status', headerName: localetext.pages.TicketInfo.CardsGrid.statusCard.headerName, halfWidth: true, headerIcon: <MdSearch />,
            renderCell: value => (<>
              <Typography
                sx={{
                  color: value === 1 ? 'success.contrastText' : value === 2 ? 'warning.contrastText' : 'error.contrastText',
                  bgcolor: value === 1 ? 'success.main' : value === 2 ? 'warning.main' : 'error.main',
                  flexGrow: 1,
                  borderRadius: 1,
                  textAlign: 'center',
                  fontWeight: 500,
                }}
              >
                {value === 1
                  ? localetext.pages.TicketInfo.CardsGrid.statusCard.valueOptions.value1Label
                  : value === 2
                    ? localetext.pages.TicketInfo.CardsGrid.statusCard.valueOptions.value2Label
                    : localetext.pages.TicketInfo.CardsGrid.statusCard.valueOptions.value0Label}
              </Typography>
            </>)
          },
          { field: 'clientName', headerName: localetext.pages.TicketInfo.CardsGrid.clientNameCard.headerName, halfWidth: true, headerIcon: <MdPerson /> },
          {
            field: 'createdAt', headerName: localetext.pages.TicketInfo.CardsGrid.createdAtCard.headerName, halfWidth: true, headerIcon: <MdCalendarToday />,
            valueFormatter: value => moment(value).format('LLL')
          },
          {
            field: 'updatedAt', headerName: localetext.pages.TicketInfo.CardsGrid.updatedAtCard.headerName, halfWidth: true, headerIcon: <MdAccessTime />,
            valueFormatter: value => moment(value).calendar()
          },
          { field: 'subject', headerName: localetext.pages.TicketInfo.CardsGrid.subjectCard.headerName, fullWidth: true },
          { field: 'description', headerName: localetext.pages.TicketInfo.CardsGrid.descriptionCard.headerName, fullWidth: true },
        ]}
      />
    </DefaultContainer >
  )
}
