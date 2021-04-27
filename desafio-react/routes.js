import React from 'react';
import { Switch, Route} from 'react-router-dom';

export default function Routes() {
    const classes = useStyles();  

    return (
        <div className={classes.root}>
            <Menu></Menu>
            
            <section className={classes.conteudo}>
                <Switch>
                        <Route exact path="/" component={Inicio} />
                </Switch>
            </section>  
        </div>
    );
}

