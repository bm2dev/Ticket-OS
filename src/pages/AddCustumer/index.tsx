import { useState } from 'react';
import { toast } from 'react-toastify';
//
import useFirestore from '../../hooks/useFirestore';
import useLocale from '../../hooks/useLocale';
//
import { LoadingButton } from '@mui/lab';
import { TextField, Grid } from '@mui/material';
//
import DefaultContainer from "../../components/DefaultContainer";
//
import { CustomerType } from '../../types';

export default function AddCustomer() {

    const { localetext } = useLocale();
    const { addDoc } = useFirestore();

    const [loading, setLoading] = useState(false);
    const [customer, setCustomer] = useState<CustomerType>({
        name: '',
        email: '',
    });

    async function addCustomer() {
        setLoading(true);
        try {
            await addDoc('clients', customer);
            setLoading(false);
            toast.success(localetext.pages.AddCustomer.functions.addCustomer.successToastText);
            setCustomer({ name: '', email: '' });
            return;

        } catch (error) {
            console.log(error);
            toast.error(localetext.pages.AddCustomer.functions.addCustomer.errorToastText);
            setLoading(false);
        }
    }

    return (
        <DefaultContainer
            title={localetext.pages.AddCustomer.defaultContainerTitle}
            subtitle={localetext.pages.AddCustomer.defaultContainerSubtitle}
        >
            <Grid container component='form' spacing={2} onSubmit={e => { e.preventDefault(); addCustomer() }}>
                <Grid item xs={12} md={12}>
                    <TextField
                        id='id_name'
                        label={localetext.pages.AddCustomer.nameInputLabel}
                        placeholder={localetext.pages.AddCustomer.nameInputPlaceholder}
                        value={customer.name}
                        onChange={e => setCustomer(p => ({ ...p, name: e.target.value }))}
                        variant='filled'
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField
                        type='email'
                        id='id_email'
                        label={localetext.pages.AddCustomer.emailInputLabel}
                        placeholder={localetext.pages.AddCustomer.emailInputPlaceholder}
                        value={customer.email}
                        onChange={e => setCustomer(p => ({ ...p, email: e.target.value }))}
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
                        {localetext.pages.AddCustomer.addButtonText}
                    </LoadingButton>
                </Grid>
            </Grid>
        </DefaultContainer>
    )
}
