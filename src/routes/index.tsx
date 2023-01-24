import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
//
import { AuthContext } from '../context/Auth';
//
import PrivateRoutes from './PrivateRoutes';
import SidebarRoutes from './SidebarRoutes';
//
import EditCustomer from '../pages/EditCustomer';
import AddCustomer from '../pages/AddCustumer';
import EditTicket from '../pages/EditTicket';
import TicketInfo from '../pages/TicketInfo';
import AddTicket from '../pages/AddTicket';
import Customers from '../pages/Customers';
import NotFound from '../pages/NotFound';
import Tickets from '../pages/Tickets';
import Profile from '../pages/Profile';
import Login from '../pages/Login';


export default function AllRoutes() {

    const { user, loadingSystem } = useContext(AuthContext);

    if (loadingSystem) return <div />;

    return (
        <Routes>

            <Route element={<PrivateRoutes />}>
                <Route element={<SidebarRoutes />}>
                    <Route path='/' element={<Navigate to='/tickets' />} />

                    <Route path='/tickets'>
                        <Route index element={<Tickets />} />
                        <Route path='add' element={<AddTicket />} />
                        <Route path='info/:ticketId' element={<TicketInfo />} />
                        {user?.accessLevel === 1 && <Route path='edit/:ticketId' element={<EditTicket />} />}
                    </Route>

                    <Route path='/customers'>
                        <Route index element={<Customers />} />
                        <Route path='add' element={<AddCustomer />} />
                        {user?.accessLevel === 1 && <Route path='edit/:clientId' element={<EditCustomer />} />}
                    </Route>

                    <Route path='/settings'>
                        <Route path='profile' element={<Profile />} />
                    </Route>
                </Route>
            </Route>

            <Route path='/login' element={<Login />} />

            <Route path='*' element={<NotFound />} />

        </Routes >
    )

}
