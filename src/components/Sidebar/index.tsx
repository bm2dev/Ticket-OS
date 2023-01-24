import app from '../../../package.json';
import {
  SetStateAction,
  ReactElement,
  Dispatch,
} from 'react';
import { toast } from 'react-toastify';
//
import useLocale from '../../hooks/useLocale';
import useMobile from '../../hooks/useMobile';
//
import {
  AccordionSummary,
  AccordionDetails,
  ListItemIcon,
  Typography,
  Accordion,
  Divider,
  Toolbar,
  Drawer,
  Stack,
  Grid,
  Link,
} from '@mui/material';
//
import ListItemLink from '../ListItemLink';
//
import {
  IoDocumentText,
  IoChevronDown,
  IoPeople,
} from 'react-icons/io5';

interface SidebarI {
  drawerWidth: string,
  navOpen: boolean,
  setNavOpen: Dispatch<SetStateAction<boolean>>,
}

interface TabsI {
  main?: boolean,
  icon?: ReactElement,
  label: string,
  to?: string,
  render?: boolean,
  tabs?: TabsI[]
}

export default function Sidebar({ drawerWidth, navOpen, setNavOpen }: SidebarI) {

  const { localetext } = useLocale();

  const isMobile = useMobile();

  const sidebarTabs: TabsI[] = [
    {
      icon: <IoDocumentText />,
      label: localetext.components.Sidebar.tabs.tickets.label,
      to: '/tickets',
    },
    {
      icon: <IoPeople />,
      label: localetext.components.Sidebar.tabs.clients.label,
      to: '/customers',
    },
  ]

  return (
    <Stack component='nav'>
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        ModalProps={{ keepMounted: true }}
        anchor='left'
        open={navOpen}
        onClose={() => setNavOpen(false)}
        sx={{ overflowX: 'none' }}
      >
        <Stack
          divider={<Divider />}
          sx={{ width: drawerWidth }}
        >
          <Toolbar
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Typography
              variant='h6'
            >
              {localetext.components.Sidebar.header.title}
            </Typography>
          </Toolbar>

          {sidebarTabs.map((tab, index) => <SidebarTab key={`${tab.label}_${index.toString()}`} props={{ ...tab }} setNavOpen={setNavOpen} />)}

          <Grid container>
            <Grid item sx={{ p: 1 }} xs={6}>
              <Link target='_blank' fontSize={12} href='https://www.linkedin.com/in/gabriel-lima-0ba2481ab/'>{localetext.components.Sidebar.footer.linkedin}</Link>
            </Grid>
            <Grid item sx={{ p: 1 }} xs={6} textAlign='end'>
              <Link target='_blank' fontSize={12} href='https://github.com/bilmoleque2'>{localetext.components.Sidebar.footer.github}</Link>
            </Grid>
            <Grid item sx={{ p: 1 }} xs={12} textAlign='center'>
              <Link
                component='button'
                fontSize={12}
                onClick={() => {
                  navigator.clipboard.writeText('gabriel.bil8@gmail.com');
                  toast.info(localetext.components.Sidebar.footer.contactInfoToast);
                }}
              >
                {localetext.components.Sidebar.footer.contact}
              </Link>
            </Grid>
            <Grid item sx={{ p: 1 }} xs={12} textAlign='center'>
              <Typography variant='caption' color='text.disabled'>v.{app.version}</Typography>
            </Grid>
          </Grid>
        </Stack>
      </Drawer>
    </Stack>
  )
}

function SidebarTab({ props, setNavOpen, expanded, setExpanded }: { props: TabsI, setNavOpen: Dispatch<SetStateAction<boolean>>, expanded?: string | boolean, setExpanded?: Dispatch<SetStateAction<string | boolean>> }) {

  if (props.render === false) return null;

  if (!props.tabs && props.to) return (
    <ListItemLink
      icon={props.icon}
      label={props.label}
      to={props.to}
      onClick={() => setNavOpen(false)}
    />
  )

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded && setExpanded(isExpanded ? panel : false);
  };

  return (
    <Accordion
      expanded={props.main ? (expanded === props.label) : undefined}
      onChange={props.main ? handleChange(props.label) : undefined}
      sx={{ 
        '&::before': { display: 'none' }, 
        bgcolor: 'inherit', 
        borderBottom: props.main ? '1px solid' : 'none',
        borderBottomColor: props.main ? 'divider' : 'none',
    }}
      TransitionProps={{ unmountOnExit: true }}
      elevation={0}
      disableGutters
      square
    >
      <AccordionSummary
        expandIcon={<IoChevronDown />}
      >
        {props.icon &&
          <ListItemIcon sx={{ color: 'currentcolor', fontSize: 20 }}>
            {props.icon}
          </ListItemIcon>
        }
        <Typography>{props.label}</Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ px: 1 }}>
        {props.tabs?.map((tab, index) => <SidebarTab key={`${index.toString()}_${tab.label}`} props={{ ...tab }} setNavOpen={setNavOpen} />)}
      </AccordionDetails>
    </Accordion>
  )
}

