import React, { useState, useEffect } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import { DataGrid } from '@mui/x-data-grid';
import axiosClient from '../../../../axios-client';

function UsersSupprimes() {
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
                            <MenuItem onClick={() => {
                                handleClose();
                                activateUser(params.row.idPersonne);
                            }}>
                                Activer
                            </MenuItem>
                        </Menu>
                    </div>
                );
            }
        }
    ];

    const getUsers = async () => {
        setLoading(true);
        try {
            const { data } = await axiosClient.get('/admin/users/supprimes');
            setRowsUsers(data.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs supprimés:", error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
        }
    };

    const activateUser = async (id) => {
        try {
            await axiosClient.post(`/admin/users/activer/${id}`);
            console.log("id:" + id)
            // Refresh the list of users after activation
            getUsers();
        } catch (error) {
            console.log("id:" + id)
            console.error("Erreur lors de l'activation de l'utilisateur:", error.response ? error.response.data : error.message);
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

export default UsersSupprimes;
