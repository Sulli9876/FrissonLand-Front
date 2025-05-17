import React, { useState } from "react";
import Users from "./backOfficeUsers";
import Categories from "./backOfficeCategories";
import Tickets from "./backOfficeTickets";
import Reservations from "./backOfficeReservations";
import Reviews from "./backOfficeReviews";
import Attractions from "./backOfficeAttractions";
import { API_BASE_URL } from "../../../config";


export default function BackOfficeAdmin() {
    const [activeTab, setActiveTab] = useState<
      "users" | "categories" | "tickets" | "reservations" | "reviews" | "attractions"
    >("users");
  
    const token = localStorage.getItem("token") || "";
  
    return (
      <main className="backoffice backoffice-admin">
        <h2>Administration</h2>
        <nav>
          <button
            className={activeTab === "users" ? "active" : ""}
            onClick={() => setActiveTab("users")}
          >
            Users
          </button>
          <button
            className={activeTab === "categories" ? "active" : ""}
            onClick={() => setActiveTab("categories")}
          >
            Categories
          </button>
          <button
            className={activeTab === "reservations" ? "active" : ""}
            onClick={() => setActiveTab("reservations")}
          >
            Reservations
          </button>
          <button
            className={activeTab === "tickets" ? "active" : ""}
            onClick={() => setActiveTab("tickets")}
          >
            Tickets
          </button>
          <button
            className={activeTab === "reviews" ? "active" : ""}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </button>
          <button
            className={activeTab === "attractions" ? "active" : ""}
            onClick={() => setActiveTab("attractions")}
          >
            Attractions
          </button>
        </nav>
  
        {activeTab === "users" && <Users token={token} apiBaseUrl={API_BASE_URL} />}
        {activeTab === "categories" && (
          <Categories token={token} apiBaseUrl={API_BASE_URL} />
        )}
        {activeTab === "tickets" && <Tickets token={token} apiBaseUrl={API_BASE_URL} />}
        {activeTab === "reservations" && (
          <Reservations token={token} apiBaseUrl={API_BASE_URL} />
        )}
        {activeTab === "reviews" && <Reviews token={token} apiBaseUrl={API_BASE_URL} />}
        {activeTab === "attractions" && (
          <Attractions token={token} apiBaseUrl={API_BASE_URL} />
        )}
      </main>
    );
  }
  