import { useNavigate } from 'react-router-dom';
import {
  SetStateAction,
  MouseEvent,
  useContext,
  Dispatch,
  useState,
} from 'react';
//
import useLocale from '../../hooks/useLocale';
import useMobile from '../../hooks/useMobile';
//
import { TemaContext } from '../../context/Tema';
import { AuthContext } from '../../context/Auth';
//
import {
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  MenuItem,
  Toolbar,
  Divider,
  Switch,
  AppBar,
  Stack,
  Menu,
} from '@mui/material';
//
import LettersAvatar from '../LettersAvatar';
import TooltipMui from '../TooltipMui';
//
import { MdLightMode, MdLogout, MdMenu, MdNightlight, MdPerson } from 'react-icons/md';

interface NavbarI {
  setNavOpen: Dispatch<SetStateAction<boolean>>,
}

export default function Navbar({ setNavOpen }: NavbarI) {

  const { localetext } = useLocale();

  const isMobile = useMobile();

  const { darkMode, setDarkMode } = useContext(TemaContext);

  return (
    <AppBar color='primary' position='static' >
      <Toolbar>

        {isMobile &&
          <IconButton
            size='large'
            edge='start'
            aria-label='menu'
            sx={{ mr: 2 }}
            color='inherit'
            onClick={() => setNavOpen(true)}
          >
            <MdMenu />
          </IconButton>
        }

        <TooltipMui
          title={darkMode
            ? localetext.components.Navbar.themeToggleButton.lightModeText
            : localetext.components.Navbar.themeToggleButton.darkModeText
          }
          placeholder='bottom'
        >
          <IconButton
            sx={{ ml: 'auto' }}
            size='large'
            aria-label='theme_toggle_button'
            color='inherit'
            onClick={() => setDarkMode(prev => !prev)}
          >
            {darkMode ? <MdLightMode /> : <MdNightlight />}
          </IconButton>
        </TooltipMui>

        <ProfileMenu />

      </Toolbar>
    </AppBar >
  )
}

function ProfileMenu() {

  const { localetext, locale, setLocale } = useLocale();

  const navigate = useNavigate();

  const { user, signOut } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  function handleClose() {
    setAnchorEl(null);
  };

  function getAccessLevelText(profileid: string | number) {
    const profileId = parseInt(profileid.toString());

    if (profileId === 1) return localetext.components.Navbar.ProfileMenu.functions.getAccessLevelText.profileId1;
    if (profileId === 2) return localetext.components.Navbar.ProfileMenu.functions.getAccessLevelText.profileId2;

    return localetext.components.Navbar.ProfileMenu.functions.getAccessLevelText.default;
  }

  return (<>
    <TooltipMui title={localetext.components.Navbar.ProfileMenu.tooltipTitle} placeholder='bottom'>
      <IconButton
        size='large'
        aria-label='profile_button'
        onClick={(e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget)}
        sx={{ width: 40, height: 40 }}
      >
        <LettersAvatar
          text={user?.name}
        />
      </IconButton>
    </TooltipMui>
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={!!anchorEl}
      onClose={handleClose}
      keepMounted
    >
      <Typography
        variant='caption'
        sx={{ mx: 1.5 }}
        color='text.secondary'
      >
        {localetext.components.Navbar.ProfileMenu.nameTitle}
      </Typography>

      <Typography
        variant='subtitle2'
        sx={{ mx: 1.5 }}
        color='text.primary'
      >
        {user?.name}
      </Typography>

      <Typography
        variant='caption'
        sx={{ mx: 1.5 }}
        color='text.secondary'
      >
        {localetext.components.Navbar.ProfileMenu.accessLevelTitle}
      </Typography>

      <Typography
        variant='subtitle2'
        sx={{ mx: 1.5 }}
        color='text.primary'
      >
        {getAccessLevelText(user?.accessLevel)}
      </Typography>

      <Divider sx={{ my: 1 }} />

      <Typography
        variant='overline'
        sx={{ mx: 1.5 }}
        color='text.primary'
      >
        {localetext.components.Navbar.ProfileMenu.languageTitle}
      </Typography>

      <Stack
        sx={{ mx: 1.5, justifyContent: 'center', alignItems: 'center' }}
        direction='row'
        spacing={1}
      >
        <Typography
          variant='overline'
        >
          EN
        </Typography>
        <Switch
          size='small'
          checked={locale === 'pt-br'}
          onChange={() => locale === 'pt-br' ? setLocale('en') : setLocale('pt-br')}
          inputProps={{ 'aria-label': 'language_toggle' }}
        />
        <Typography
          variant='overline'
        >
          PT-BR
        </Typography>
      </Stack>

      <Divider sx={{ my: 1 }} />

      <Typography
        variant='overline'
        sx={{ mx: 1.5 }}
        color='text.primary'
      >
        {localetext.components.Navbar.ProfileMenu.settingsTitle}
      </Typography>

      <MenuItem
        onClick={() => { navigate('/settings/profile'); handleClose() }}
      >
        <ListItemIcon>
          <MdPerson />
        </ListItemIcon>
        <ListItemText>
          {localetext.components.Navbar.ProfileMenu.profileButtonText}
        </ListItemText>
      </MenuItem>

      <MenuItem
        onClick={() => { signOut(); handleClose() }}
      >
        <ListItemIcon sx={{ color: 'error.light' }}>
          <MdLogout />
        </ListItemIcon>
        <ListItemText sx={{ color: 'error.light' }}>
          {localetext.components.Navbar.ProfileMenu.signOutButtonText}
        </ListItemText>
      </MenuItem>
    </Menu>
  </>)
}