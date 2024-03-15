import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

import { Link } from 'react-router-dom';

import axiosClient from '../../../axios-client';
import { useStateContext } from '../../../contexts/ContextProvider';
import theme from '../../../theme';
import formatDate from '../../../outils/formatDate';

import { DataGrid } from '@mui/x-data-grid';
import { Button, Typography, Grid } from '@mui/material';
import { Tabs, Tab } from '@mui/material';

import { roundAmount } from '../../../outils/arrMontant';

export default function GestionEvents() {

    const [tabValue, setTabValue] = useState(0);
    const [value, setValue] = useState(0);
    const [evenements, setEvenements] = useState([]);
    const [loading, setLoading] = useState(false);

    const tabLabel = (index) => {
        //--------------------------------------------------------
        //Si vous souhaiter changer le nom des onglets, c'est ici
        //Rajouter simplement une condition contenant le nouvel index
        //Et indiquer les nouvelles informations dans les divs
        //--------------------------------------------------------
        if (index === 0) {
            return (
                <div>
                    <Grid container columnGap={"30px"}>
                        <Typography variant="h2">Demandées</Typography>
                        {/* <Typography variant='body1' sx={{ fontSize: '18px' }}>{prestataires.length}</Typography> */}
                    </Grid>
                </div>
            );
        }
        //--------------------------------------------------------
        //Vous pouvez suivre ce template en cas de nouvel ajout
        //
        if (index === 1) {
            return (
                <div>
                    <Grid container columnGap={"30px"}>
                        <Typography variant="h2"> À venir </Typography>
                        {/* <Typography variant='body1' sx={{ fontSize: '18px' }}> [new Count] </Typography> */}
                    </Grid>
                </div>
            );
        }
        //--------------------------------------------------------
        else {
            return (
                <div>
                    <Grid container columnGap={"30px"}>
                        <Typography variant="h2">Annulé</Typography>
                        {/* <Typography variant='body1' sx={{ fontSize: '18px' }}>{users.length}</Typography> */}
                    </Grid>
                </div>
            );
        }
    };

    const columns = [
        {
            field: 'id',
            headerName: 'id',
            width: 200,
            editable: false,
        },
        {
            field: 'evenementNom',
            headerName: 'titre',
            width: 200,
            editable: false,
        },
        {
            field: 'evenementDate',
            headerName: 'Date',
            width: 200,
            editable: false,
        },
        {
            field: 'paiementStatus',
            headerName: 'Status du paiement',
            width: 200,
            editable: false,
        },
        {
            field: 'paiementNo',
            headerName: 'Référence Payrexx',
            width: 200,
            editable: false,
        },
        {
            field: 'paiementMontant',
            headerName: 'Montant payé',
            width: 200,
            editable: false,
            valueFormatter: (params) => {
                return `${roundAmount(params.value)} CHF`;
            }
        },
    ]

    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };

    const getEvenements = () => {
        setLoading(true);
        axiosClient
            .get("/admin/events")
            .then(({ data }) => {
                console.log(data)
                setEvenements(data);
                setLoading(false);
            })
            .catch(({ error }) => {
                console.log(error);
            });
    };

    React.useEffect(() => {
        getEvenements();

    }, []);

    return (

        <Grid
            maxWidth="1643px"
            style={{
                padding: "38px 100px 38px 100px",
                // width: '1643px',
            }}
        >
            {/* <h1>user : {user.name} - role : {user.role}</h1> */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "38px",
                }}
            >  
                <Typography variant="h1">Réservations</Typography>

                <Link to="/admin/events/new">
                    <Button variant="contained" color="primary">
                        Nouveau
                    </Button>
                </Link>
            </div>
            {evenements ? (
                <>

                </>
            ) : (
                <></>


            )}
            <Tabs
                value={tabValue}
                onChange={(event, newValue) => {
                    setTabValue(newValue);
                }}
                TabIndicatorProps={{ style: { display: "none" } }}
                indicatorColor="primary"
                textColor="primary"
                sx={{
                    backgroundColor: "grey100.main",
                    borderRadius: "0px",
                    border: "none",
                    "& .MuiTab-root": {
                        borderRadius: "0px",
                        borderTop: "1px solid #D1D5DB",
                        borderLeft:
                            tabValue === 0 ? "none" :
                                tabValue === 1 ? "1px solid #D1D5DB" :
                                    tabValue === 2 ? "1px solid #D1D5DB" : "none",
                        borderRight:
                            tabValue === 0 ? "1px solid #D1D5DB" :
                                tabValue === 1 ? "1px solid #D1D5DB" :
                                    tabValue === 2 ? "none" : "none",
                    },
                    "& .Mui-selected": {
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: "background.default",
                        border: "none",
                    },
                }}
                // leftAlign
            >
                <Tab key={0} label={tabLabel(0)} />
                <Tab key={1} label={tabLabel(1)} />
                <Tab key={2} label={tabLabel(2)} />
            </Tabs>




            <DataGrid
                rows={evenements}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            // pageSize: 10,
                        },
                    },
                }}
                // pageSizeOptions={[10]}
                getRowId={(row) => row.id}
                rowHeight={60}
                columnHeaderHeight={80}
                sx={{
                    // fontFamily: 'Roboto, sans-serif',
                    backgroundColor: "background.default",
                    borderRadius: "0px",
                    border: "none",
                    "& .MuiDataGrid-columnHeaderTitle": {
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                        color: "secondary.main",
                    },
                    "& .MuiDataGrid-cell": {
                        color: "#000000",
                        // fontSize: '14px',
                        fontSize: "0.9rem",
                    },
                }}
                // checkboxSelection
                disableRowSelectionOnClick
            />
        </Grid>
    );
}
