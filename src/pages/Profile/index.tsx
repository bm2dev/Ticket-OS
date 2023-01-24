import { useContext } from 'react';
//
import useLocale from '../../hooks/useLocale';
//
import { AuthContext } from '../../context/Auth';
//
import { Divider } from '@mui/material';
//
import DefaultContainer from '../../components/DefaultContainer';
import CardsGrid from '../../components/CardsGrid';
//
import { MdLock, MdPerson } from 'react-icons/md';
import { HiAtSymbol } from 'react-icons/hi';

export default function Profile() {

  const { localetext } = useLocale();
  const { user } = useContext(AuthContext);

  function getAccessLevelText(profileid: string | number) {
    const profileId = parseInt(profileid.toString());

    if (profileId === 1) return localetext.pages.Profile.functions.getAccessLevelText.profileId1;
    if (profileId === 2) return localetext.pages.Profile.functions.getAccessLevelText.profileId2;

    return localetext.pages.Profile.functions.getAccessLevelText.default;
  }

  return (
    <DefaultContainer
      title={localetext.pages.Profile.defaultContainerTitle}
    >
      <Divider sx={{ my: 2 }} />

      <CardsGrid
        object={user}
        cards={[
          { field: 'name', headerName: localetext.pages.Profile.CardsGrid.nameCard.headerName, halfWidth: true, headerIcon: <MdPerson /> },
          { field: 'email', headerName: localetext.pages.Profile.CardsGrid.emailCard.headerName, halfWidth: true, headerIcon: <HiAtSymbol /> },
          {
            field: 'accessLevel', headerName: localetext.pages.Profile.CardsGrid.accessLevelCard.headerName, halfWidth: true, headerIcon: <MdLock />,
            valueFormatter: value => getAccessLevelText(value)
          },
        ]}
      />
    </DefaultContainer>
  )
}
