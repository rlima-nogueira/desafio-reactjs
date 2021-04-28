import React, { useState } from 'react';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField'

import { useHistory } from 'react-router-dom';
import axios from 'axios';

import styles from './home.module.scss';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
export default function Home() {
    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [usuario, setUsuario] = useState('');
    const [erro, setErro] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    function handlePesquisa(){
       setOpen(true);
        axios.get(`https://api.github.com/users/${usuario}/repos`)
        .then(response => {
            const repositories = response.data;
            localStorage.setItem('repositories', JSON.stringify(repositories));
            setErro(false);
            setOpen(false);
            history.push('/perfil');
        }).catch(err => {
          setErro(true);
          setOpen(false);
        });

        axios.get(`https://api.github.com/users/${usuario}`).then((response) => {
            const dadosUsuario = response.data;
            localStorage.setItem('usuario', JSON.stringify(dadosUsuario));
            setErro(false);
            setOpen(false);
            history.push('/perfil');
        }).catch(err => {
            setErro(true);
            setOpen(false);
        });;
      }

    return (
       <Box component="div" className={styles.container}> 
       <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
            <CircularProgress color="inherit" />
        </Backdrop>
           <Box component="section" className={styles.titulo} > 
                <Typography variant="h2" component="h2" style={{fontStyle: 'italic'}}>
                        Search Devs
                </Typography>
            </Box>    
           
            <Box component="section" className={styles.buscar}>
                <TextField className={styles.inputBuscar}
                    id="buscarGit"
                    placeholder="Type the username here..."
                    variant="outlined"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                />
                <Button variant="contained" className={styles.botaoBuscar} onClick={handlePesquisa}>
                    <SearchIcon style={{color: '#e6e6e6'}}/>
                    <span  style={{color: '#e6e6e6', fontWeight: 'bold'}}>Buscar</span>
                </Button>
                { erro ? 
      
            <Alert severity="error"
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setErro(false);
                    }}
                    >
                    <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                >
                Ocorreu um erro. Tente novamente!
            </Alert>
            : '' }
                
           </Box>
       </Box>

    );
}