import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client";

function ME_notification() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        recupererNotifications();
    }, []);

    const recupererNotifications = async () => {
        try {
            // Récupérer les notifications
            const response = await axiosClient.get('/notifications');
            const notificationsData = response.data;
            setNotifications(notificationsData);
            console.log('Notifications récupérées avec succès :', notificationsData);
        } catch (error) {
            console.error('Erreur lors de la récupération des notifications :', error);
        }
    };

    return (
        <div className="notification-container">
            <table className="notification-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Contenu</th>
                    </tr>
                </thead>
                <tbody>
                    {notifications.map((notification, index) => (
                        <tr key={index}>
                            <td>{notification.title}</td>
                            <td>{notification.contenu}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ME_notification;
