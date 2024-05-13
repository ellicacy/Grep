import React from "react";  


function ME_notification() {
    return (
        <div className="notification-container">
            <table className="notification-table">
                <thead>
                    <tr>
                        <th>Date Réservée</th>
                        <th>Mail</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>01/05/2024</td>
                        <td>exemple@mail.com</td>
                        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
                    </tr>
                    {/* Ajoutez plus de lignes de notification ici si nécessaire */}
                </tbody>
            </table>
        </div>
    );
}

export default ME_notification;