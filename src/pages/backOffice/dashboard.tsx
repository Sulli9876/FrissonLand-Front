import React from "react";

export default function Dashboard() {
    return (
        <main className="dashboard-container">
            <h2>Dashboard</h2>
            <div className="dashboard-menu-container">
                <ul>
                    <li><a href="/backOffice/attractions">Attractions</a></li>
                    <li><a href="/backOffice/tickets">Tickets</a></li>
                    <li><a href="/backOffice/categories">Catégories</a></li>
                    <li><a href="/backOffice/users">Utilisateurs</a></li>
                    <li><a href="/backOffice/reservations">Reservations</a></li>
                    <li><a href="/backOffice/avis">Avis</a></li>
                </ul>

            </div>
        </main>
    );
}