import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client";
import "../index.css";

function ME_notification() {
    const [notifications, setNotifications] = useState([]);
    const user = JSON.parse(localStorage.getItem("USER"));

    useEffect(() => {
        recupererNotifications();
    }, []);

    const recupererNotifications = async () => {
        try {
            const response = await axiosClient.get(`user/${user.idPersonne}/notifications`);
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
                            <td className="content-place">{notification.content}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ME_notification;
