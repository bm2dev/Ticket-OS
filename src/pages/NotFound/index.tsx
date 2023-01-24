import { useNavigate } from 'react-router-dom';
//
import useLocale from '../../hooks/useLocale';
//
import { Container, Typography, Button, Stack } from '@mui/material';

export default function NotFound() {

  const { localetext } = useLocale();
  const navigate = useNavigate();

  return (

    <Container
      maxWidth='xs'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
      }}
    >

      <Typography
        variant='h3'
        textAlign='center'
      >
        {localetext.pages.NotFound.title}
      </Typography>

      <Typography
        sx={{ my: 2 }}
        variant='subtitle1'
        textAlign='center'
      >
        {localetext.pages.NotFound.subtitle}
      </Typography>

      <Stack direction='row' justifyContent='center'>
        <Button onClick={() => navigate('/')}>
          {localetext.pages.NotFound.backToHomeButtonText}
        </Button>
      </Stack>

    </Container >
  )
}
