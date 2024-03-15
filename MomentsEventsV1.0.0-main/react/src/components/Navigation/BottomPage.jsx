import React from 'react';
import { Grid, Typography, Container, Link, Divider } from '@mui/material';



export default function BottomPage(props) {



    return (
        <>
            <Grid
                width={'100vw'}
                container
                alignContent={'center'}
                justifyContent={'center'}
                alignItems={'center'}
                mt={'20px'}
                padding={{ xs: '0px 20px 0px 20px', lg: '0px 0px 0px 0px' }}
            >
                <Grid
                    id='PiedDePage'
                    key='PiedDePage'
                    container
                    direction='row'
                    columns={{
                        xs: 4,
                        sm: 8,
                        md: 12
                    }}
                    sx={{
                        pt: '20px',
                        pb: '20px',
                        width: '1180px',
                    }}
                    alignItems={'center'}
                >
                    <Grid item xs={12} mb='20px'>
                        <Divider />
                    </Grid>
                    <Grid item xs>
                        <Grid container>
                            <Grid item xs={12} mb='10px'>
                                <Typography variant="h4" fontWeight={700} fontSize={"18px"}>Sparkling</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="body2" sx={{ lineHeight: '32px', fontWeight: '500', color: '#9CA3AF' }}>Copyright 2023 Sparkling</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={10}>
                        <Grid item container direction='row' mb='10px'>
                            <Grid item xs={2.5} md={1.3}>
                                <Link href='/prestations' variant="subtitle1" sx={{ lineHeight: '24px', minWidth: '120px', textDecoration: 'none' }}>Prestations</Link>
                            </Grid>
                            <Grid item xs={3.1} sm={1.4}>
                                <Link href='/prestataires' variant="subtitle1" sx={{ lineHeight: '24px', textDecoration: 'none' }}>Prestataires</Link>
                            </Grid>
                            <Grid item xs={2} md={1.3}>
                                <Link href='/propos' variant="subtitle1" sx={{ lineHeight: '24px', textDecoration: 'none' }}>À propos</Link>
                            </Grid>
                            <Grid item xs={2} md={1.3}>
                                <Link href='/contact' variant="subtitle1" sx={{ lineHeight: '24px', textDecoration: 'none' }}>Contact</Link>
                            </Grid>
                            <Grid item container xs justifyContent='flex-end'>
                                <Link href="/login" variant="subtitle1" sx={{ lineHeight: '24px', textDecoration: 'none' }}>Se connecter</Link>
                            </Grid>
                        </Grid>
                        <Grid item container xs={12}>
                            <Grid item xs={2.5} md={1.3}>
                                <Link href='/impressum' variant="subtitle1" sx={{ lineHeight: '32px', textDecoration: 'none' }}>Impressum</Link>
                            </Grid>
                            <Grid item xs={4} sm={1.7}>
                                <Link href='/policy' variant="subtitle1" sx={{ lineHeight: '32px', textDecoration: 'none' }}>Privacy policy</Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
