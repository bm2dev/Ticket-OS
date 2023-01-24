import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
//
import useFirestore from '../../hooks/useFirestore';
import useLocale from '../../hooks/useLocale';
//
import { LoadingButton } from '@mui/lab';
import {
    TextField,
    Skeleton,
    Grid,
} from '@mui/material';
//
import DefaultContainer from "../../components/DefaultContainer";
//
import { CustomerType } from '../../types';

export default function EditCustomer() {

    const { localetext } = useLocale();
    const { clientId } = useParams();

    const { editDoc, getDoc } = useFirestore();

    const [loadingPage, setLoadingPage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [client, setClient] = useState<CustomerType | { [key: string]: any }>({
        name: '',
        email: '',
    });

    async function editClient() {
        setLoading(true);
        try {
            await editDoc('clients', clientId || '', client);
            setLoading(false);
            toast.success(localetext.pages.EditCustomer.functions.editClient.successToastText);

        } catch (error) {
            console.log(error);
            toast.error(localetext.pages.EditCustomer.functions.editClient.errorToastText);
            setLoading(false);
        }
    }

    useEffect(() => {
        async function getClientInfo() {
            setLoadingPage(true);
            try {
                let data = await getDoc('clients', clientId || '');
                if (!data) return toast.error(localetext.pages.EditCustomer.functions.getClientInfo.errorToastTextNotFound);
                setClient(data);
                setLoadingPage(false);

            } catch (error) {
                console.log(error);
                toast.error(localetext.pages.EditCustomer.functions.getClientInfo.errorToastText);
            }
        }
        getClientInfo();
    }, [])

    if (loadingPage) {
        return (
            <DefaultContainer
                title={localetext.pages.EditCustomer.defaultContainerTitle}
                subtitle={localetext.pages.EditCustomer.defaultContainerSubtitle}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Skeleton variant='rounded' height={55} />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Skeleton variant='rounded' height={55} />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Skeleton variant='rounded' height={45} width={130} />
                    </Grid>
                </Grid>
            </DefaultContainer>
        )
    }

    return (
        <DefaultContainer
            title={localetext.pages.EditCustomer.defaultContainerTitle}
            subtitle={localetext.pages.EditCustomer.defaultContainerSubtitle}
        >
            <Grid container component='form' spacing={2} onSubmit={e => { e.preventDefault(); editClient() }}>
                <Grid item xs={12} md={12}>
                    <TextField
                        id='id_name'
                        label={localetext.pages.EditCustomer.nameInputLabel}
                        placeholder={localetext.pages.EditCustomer.nameInputPlaceholder}
                        value={client.name}
                        onChange={e => setClient(p => ({ ...p, name: e.target.value }))}
                        variant='filled'
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField
                        type='email'
                        id='id_email'
                        label={localetext.pages.EditCustomer.emailInputLabel}
                        placeholder={localetext.pages.EditCustomer.emailInputPlaceholder}
                        value={client.email}
                        onChange={e => setClient(p => ({ ...p, email: e.target.value }))}
                        variant='filled'
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
                        {localetext.pages.EditCustomer.editButtonText}
                    </LoadingButton>
                </Grid>
            </Grid>
        </DefaultContainer>
    )
}
