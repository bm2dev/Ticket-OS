import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { InputType } from 'zlib';
import {
    LocalizationProvider,
    DatePickerProps,
    DatePicker,
} from '@mui/x-date-pickers';

export default function DatePickerMui({ ...props }: DatePickerProps<InputType, Date>) {
    return (
        <LocalizationProvider
            dateAdapter={AdapterMoment}
            adapterLocale='pt-br'
        >
            <DatePicker
                {...props}
            />
        </LocalizationProvider>
    )
}
