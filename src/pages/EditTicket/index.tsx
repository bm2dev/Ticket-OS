import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';
//
import useFirestore from '../../hooks/useFirestore';
import useLocale from '../../hooks/useLocale';
//
import { LoadingButton } from '@mui/lab';
import {
    FormControl,
    InputLabel,
    TextField,
    MenuItem,
    Skeleton,
    Select,
    Grid,
} from '@mui/material';
//
import DefaultContainer from "../../components/DefaultContainer";
//
import { CustomerType, TicketType } from '../../types';

interface ClientIdType extends CustomerType { id: string }

export default function EditTicket() {

    const { localetext } = useLocale();
    const { ticketId } = useParams();

    const { editDoc, getDocs, getDoc } = useFirestore();

    const [clients, setCustomers] = useState<ClientIdType[] | { [key: string]: any }[]>([]);
    const [loadingPage, setLoadingPage] = useState(false);
    const [clientStr, setClientStr] = useState('');
    const [loading, setLoading] = useState(false);
    const [ticket, setTicket] = useState<TicketType | { [key: string]: any }>({
        clientId: '',
        clientName: '',
        createdAt: '',
        updatedAt: '',
        description: '',
        status: 0,
        subject: '',
        userId: '',
    });

    async function editTicket() {
        setLoading(true);
        try {
            await editDoc('tickets', ticketId || '', { ...ticket, updatedAt: moment().format() });
            setLoading(false);
            toast.success(localetext.pages.EditTicket.functions.editTicket.successToastText);

        } catch (error) {
            console.log(error);
            toast.error(localetext.pages.EditTicket.functions.editTicket.errorToastText);
            setLoading(false);
        }
    }

    useEffect(() => {
        async function getTicketInfo() {
            setLoadingPage(true);
            try {
                let data1 = await getDocs('clients');
                setCustomers(data1);

                let data2 = await getDoc('tickets', ticketId || '');
                if (!data2) return toast.error(localetext.pages.EditTicket.functions.getTicketInfo.errorToastTextNotFound);
                setTicket(data2);
                setClientStr(JSON.stringify(data1.find(item => item.id === data2?.clientId)));

                setLoadingPage(false);
            } catch (error) {
                console.log(error);
                toast.error(localetext.pages.EditTicket.functions.getTicketInfo.errorToastText);
            }
        }
        getTicketInfo();
    }, [])

    if (loadingPage) {
        return (
            <DefaultContainer
                title={localetext.pages.EditTicket.defaultContainerTitle}
                subtitle={localetext.pages.EditTicket.defaultContainerSubtitle}
            >

                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Skeleton variant='rounded' height={55} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Skeleton variant='rounded' height={55} />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Skeleton variant='rounded' height={55} />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Skeleton variant='rounded' height={45} width={100} />
                    </Grid>
                </Grid>
            </DefaultContainer>
        )
    }

    return (
        <DefaultContainer
            title={localetext.pages.EditTicket.defaultContainerTitle}
            subtitle={localetext.pages.EditTicket.defaultContainerSubtitle}
        >

            <Grid container component='form' spacing={2} onSubmit={e => { e.preventDefault(); editTicket() }}>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant='filled' required>
                        <InputLabel id='id_client'>{localetext.pages.EditTicket.clientSelectLabel}</InputLabel>
                        <Select
                            label={localetext.pages.EditTicket.clientSelectLabel}
                            labelId='id_client'
                            id='id_client_select'
                            value={clientStr}
                            onChange={e => {
                                setClientStr(e.target.value);
                                let client = JSON.parse(e.target.value);
                                setTicket(p => ({
                                    ...p,
                                    clientId: client?.id || '',
                                    clientName: client?.name || '',
                                }))
                            }}
                        >
                            {clients.map(item =>
                                <MenuItem key={item.id} value={JSON.stringify(item)}>{item.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        id='id_subject'
                        label={localetext.pages.EditTicket.subjectInputLabel}
                        placeholder={localetext.pages.EditTicket.subjectInputPlaceholder}
                        value={ticket.subject}
                        onChange={e => setTicket(p => ({ ...p, subject: e.target.value }))}
                        variant='filled'
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField
                        id='id_description'
                        label={localetext.pages.EditTicket.descriptionInputLabel}
                        placeholder={localetext.pages.EditTicket.descriptionInputPlaceholder}
                        value={ticket.description}
                        onChange={e => setTicket(p => ({ ...p, description: e.target.value }))}
                        variant='filled'
                        multiline
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <LoadingButton
                        type='submit'
                        variant='contained'
                        size='large'
                        loading={loading}
                    >
                        {localetext.pages.EditTicket.editButtonText}
                    </LoadingButton>
                </Grid>
            </Grid>
        </DefaultContainer>
    )
}
