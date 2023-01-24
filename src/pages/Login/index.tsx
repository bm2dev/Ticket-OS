import app from '../../../package.json';
import { useContext, useState } from 'react';
//
import useLocale from '../../hooks/useLocale';
//
import { AuthContext } from '../../context/Auth';
//
import LoadingButton from '@mui/lab/LoadingButton';
import {
  InputAdornment,
  Typography,
  IconButton,
  Container,
  TextField,
  Divider,
  Switch,
  Paper,
  Stack,
  Grid,
  Box,
} from '@mui/material';
//
import { HiEye, HiEyeOff } from 'react-icons/hi';

export default function Login() {

  const { localetext, locale, setLocale } = useLocale();
  const { signIn, loadingAuth } = useContext(AuthContext);

  const [showSenha, setShowSenha] = useState(false);
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');


  const sxCredentials = { '&:hover': { bgcolor: 'action.hover' }, cursor: 'pointer', p: 1 }

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
      <Paper
        sx={{ p: 3, width: '100%' }}
        elevation={3}
      >
        <Typography
          variant='h4'
          fontWeight={600}
          textAlign='center'
          color='primary.main'
        >
          {localetext.pages.Login.title}
        </Typography>

        <Typography
          variant='subtitle1'
          textAlign='center'
        >
          {localetext.pages.Login.subtitle}
        </Typography>

        <Grid container sx={{ mt: 1 }}>
          <Grid item sx={sxCredentials} xs>
            <Typography
              flexGrow={1}
              variant='body2'
              textAlign='center'
              onClick={() => { setEmail('admin@acesso.com'); setSenha('admin123') }}
            >
              {localetext.pages.Login.adminUserText}
            </Typography>
          </Grid>

          <Divider orientation='vertical' flexItem />

          <Grid item sx={sxCredentials} xs>
            <Typography
              flexGrow={1}
              variant='body2'
              textAlign='center'
              onClick={() => { setEmail('atendente@acesso.com'); setSenha('atendente123') }}
            >
              {localetext.pages.Login.normalUserText}
            </Typography>
          </Grid>
        </Grid>

        <Box
          component='form'
          onSubmit={e => { e.preventDefault(); signIn(email, senha) }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            mt: 1,
          }}
        >
          <TextField
            type='email'
            id='id_email'
            label={localetext.pages.Login.emailInputLabel}
            placeholder={localetext.pages.Login.emailInputPlaceholder}
            value={email}
            onChange={e => setEmail(e.target.value)}
            margin='normal'
            fullWidth
            required
            autoFocus
          />

          <TextField
            type={showSenha ? 'text' : 'password'}
            id='id_password'
            label={localetext.pages.Login.passwordInputLabel}
            placeholder={localetext.pages.Login.passwordInputPlaceholder}
            value={senha}
            onChange={e => setSenha(e.target.value)}
            margin='normal'
            fullWidth
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle_password_visibility'
                    onClick={() => { setShowSenha(prev => !prev) }}
                    edge='end'
                  >
                    {showSenha ? <HiEyeOff /> : <HiEye />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton
            type='submit'
            fullWidth
            variant='outlined'
            size='large'
            sx={{ mt: 3, mb: 2 }}
            loading={loadingAuth}
          >
            {localetext.pages.Login.signInButtonText}
          </LoadingButton>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography
          variant='subtitle2'
          textAlign='center'
        >
          {localetext.pages.Login.language}
        </Typography>

        <Stack
          sx={{ justifyContent: 'center', alignItems: 'center' }}
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

      </Paper>
      <Stack alignItems='center'>
        <Typography variant='caption' color='text.secondary'>v.{app.version}</Typography>
      </Stack>
    </Container>
  )
}
