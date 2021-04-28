import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';

import styles from './perfil.module.scss';
import { Typography } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BusinessIcon from '@material-ui/icons/Business';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EmailIcon from '@material-ui/icons/Email';
import LinkIcon from '@material-ui/icons/Link';
import TwitterIcon from '@material-ui/icons/Twitter';

export default function Perfil() {
    const history = useHistory();
    const [gitRepositories, setGitRepositories] = useState([ ]); 
    const [usuario, setUsuario] = useState(''); 
    
    useEffect(() => {
        let profile = localStorage.getItem('usuario');
        let repositories = localStorage.getItem('repositories')

            if (profile !== null || repositories !== null) {
                profile = JSON.parse(profile);
                setUsuario(profile);    
                
                repositories = JSON.parse(repositories);
                setGitRepositories(repositories);

            } else {
                history.push('/');
            }
    }, []);
    
    

    return (
        <Box component="div" className={styles.container}>
            <Box component="aside" className={styles.perfil}>
               <Box component="section" className={styles.fotoPerfil}>
                    <img style={{width: '200px', height: '200px'}} 
                        src={usuario.avatar_url} alt="Foto de Perfil"/>
               </Box>
               <Box component="section" className={styles.dadosUsuario}>
                    <Typography component="h2" style={{fontStyle: 'italic', fontSize: '1.8rem', color: '#cccccc'}}>
                        {usuario.name}
                    </Typography>
                    <span>
                        @{usuario.login}
                    </span>
                    <Box className={styles.biografia}> 
                        <p>{usuario.bio}</p>
                    </Box>

                    <Box className={styles.dadosSeguidores}>
                        <span>
                            <GroupIcon/>
                            {usuario.followers}
                        </span>
                        <span>
                            <FavoriteBorderIcon/>
                            {usuario.following}
                        </span>
                        {/* <span>
                            {usuario.starred_url}
                        </span> */}
                    </Box>
                    
                    <Box className={styles.dadosPerfil}>
                        <span>
                            <BusinessIcon/>
                            {usuario.company ? usuario.company : 'organization'}
                        </span>
                        <span>
                            <LocationOnIcon/>
                            {usuario.location ? usuario.location : 'location'}
                        </span>
                        <span>
                            <EmailIcon/>
                            {usuario.email ? usuario.email : 'email'}
                        </span>
                        <span className={styles.blog}>
                            <LinkIcon/>
                            {usuario.blog ? usuario.blog : 'blog'}
                        </span>
                        <span>
                            <TwitterIcon/>
                            {usuario.twitter_username ? usuario.twitter_username : 'twitter'}
                        </span>
                    </Box>
               </Box>
            </Box>
        </Box>
    );
}