import React, { useState, useEffect } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import { DataGrid } from '@mui/x-data-grid';
import axiosClient from '../../../../axios-client';

function UsersActifs() {
    const [loading, setLoading] = useState(false);
    const [rowsUsers, setRowsUsers] = useState([]);

    const columns = [
        { field: 'client', headerName: 'Client', flex: 1 },
        {
            field: 'inscription',
            headerName: 'Inscription',
            flex: 1,
            renderCell: (params) => {
                const formattedDate = format(new Date(params.value), 'd MMMM yyyy', { locale: fr });
                return <span>{formattedDate}</span>;
            }
        },
        { field: 'statut', headerName: 'Statut', flex: 1 },
        { field: 'role', headerName: 'Rôle', flex: 1 },

        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => {
                const [anchorEl, setAnchorEl] = useState(null);

                const handleClick = (event) => {
                    setAnchorEl(event.currentTarget);
                };

                const handleClose = () => {
                    setAnchorEl(null);
                };

                const handleDeactivate = async () => {
                    handleClose();
                    try {
                        await axiosClient.post(`/admin/users/desactiver/${params.row.idPersonne}`);
                        getUsers(); // Rafraîchir la liste après la désactivation
                    } catch (error) {
                        console.error("Erreur lors de la désactivation de l'utilisateur:", error.response ? error.response.data : error.message);
                    }
                };

                const changeRole = async (newRole) => {
                    handleClose();
                    try {
                        await axiosClient.post(`/admin/users/changerRole/${params.row.idPersonne}`, { role: newRole });
                        getUsers(); // Rafraîchir la liste après le changement de rôle
                    } catch (error) {
                        console.error(`Erreur lors du changement de rôle à ${newRole}:`, error.response ? error.response.data : error.message);
                    }
                };

                return (
                    <div>
                        <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            size="small"
                            onClick={handleClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="long-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleDeactivate}>Désactiver</MenuItem>
                            <MenuItem component={RouterLink} to={`/admin/users/${params.row.idPersonne}`}>
                                Modifier
                            </MenuItem>
                            <MenuItem onClick={() => changeRole('user')}>Passer user</MenuItem>
                            <MenuItem onClick={() => changeRole('prestataire')}>Passer prestataire</MenuItem>
                        </Menu>
                    </div>
                );
            }
        }
    ];

    const getUsers = async () => {
        setLoading(true);
        try {
            const { data } = await axiosClient.get('/admin/users/actifs');
            setRowsUsers(data.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs:", error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rowsUsers}
                columns={columns}
                pageSize={5}
                loading={loading}
                getRowId={(row) => row.idPersonne}
            />

        </div>
    );
}

export default UsersActifs;
