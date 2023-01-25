import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';
//
import useFirestore from '../../hooks/useFirestore';
import useLocale from '../../hooks/useLocale';
//
import { AuthContext } from '../../context/Auth';
//
import { LoadingButton } from '@mui/lab';
import {
    FormControl,
    InputLabel,
    TextField,
    MenuItem,
    Select,
    Grid,
} from '@mui/material';
//
import DefaultContainer from "../../components/DefaultContainer";
//
import { CustomerType, TicketType } from '../../types';

interface ClientIdType extends CustomerType { id: string }

export default function AddTicket() {

    const { localetext } = useLocale();

    const { user } = useContext(AuthContext);
    const { addDoc, getDocs } = useFirestore();

    const [clients, setCustomers] = useState<ClientIdType[] | { [key: string]: any }[]>([]);
    const [loadingCustomers, setLoadingCustomers] = useState(true);
    const [clientStr, setClientStr] = useState('');
    const [loading, setLoading] = useState(false);
    const [ticket, setTicket] = useState<TicketType | { [key: string]: any }>({
        clientId: '',
        clientName: '',
        createdAt: '',
        updatedAt: '',
        description: '',
        status: 1,
        subject: '',
        userId: user?.uid,
    });

    async function addTicket() {
        setLoading(true);
        try {
            await addDoc('tickets', {
                ...ticket,
                createdAt: moment().format(),
                updatedAt: moment().format(),
            });
            setLoading(false);
            toast.success(localetext.pages.AddTicket.functions.addTicket.successToastText);
            setTicket({ clientId: '', clientName: '', createdAt: '', updatedAt: '', description: '', status: 1, subject: '', userId: user?.uid });
            setClientStr('');

        } catch (error) {
            console.log(error);
            toast.error(localetext.pages.AddTicket.functions.addTicket.errorToastText);
            setLoading(false);
        }
    }

    useEffect(() => {
        async function getCustomers() {
            setLoadingCustomers(true);
            try {
                let data = await getDocs('customers');
                setCustomers(data);
                setLoadingCustomers(false);

            } catch (error) {
                console.log(error);
                toast.error(localetext.pages.AddTicket.functions.getCustomers.errorToastText);
                setLoadingCustomers(false);
            }
        }
        getCustomers();
    }, [])

    return (
        <DefaultContainer
            title={localetext.pages.AddTicket.defaultContainerTitle}
            subtitle={localetext.pages.AddTicket.defaultContainerSubtitle}
        >
            <Grid container component='form' spacing={2} onSubmit={e => { e.preventDefault(); addTicket() }}>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant='filled' required disabled={loadingCustomers}>
                        <InputLabel id='id_client'>{localetext.pages.AddTicket.clientSelectLabel}</InputLabel>
                        <Select
                            label={localetext.pages.AddTicket.clientSelectLabel}
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
                        label={localetext.pages.AddTicket.subjectInputLabel}
                        placeholder={localetext.pages.AddTicket.subjectInputPlaceholder}
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
                        label={localetext.pages.AddTicket.descriptionInputLabel}
                        placeholder={localetext.pages.AddTicket.descriptionInputPlaceholder}
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
                        {localetext.pages.AddTicket.addButtonText}
                    </LoadingButton>
                </Grid>
            </Grid>
        </DefaultContainer>
    )
}
