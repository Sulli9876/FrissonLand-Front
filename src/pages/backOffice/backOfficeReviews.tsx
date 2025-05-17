import React, { useEffect, useState } from "react";
import { Ireviews } from "../../type/types";

interface ReviewsProps {
  token: string;
  apiBaseUrl: string;
}

export default function BackOfficeReviews({ token, apiBaseUrl }: ReviewsProps) {
  const [reviews, setReviews] = useState<Ireviews[]>([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = () => {
    fetch(`${apiBaseUrl}/admin/reviews`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setReviews(data.reviews || data))
      .catch(console.error);
  };

  return (
    <main className="backoffice backoffice-reviews">
    <h2>Avis des utilisateurs</h2>
    <ul>
      {reviews.map((r) => (
        <li key={r.id}>
          <strong>{r.user.first_name} {r.user.last_name}</strong> <strong>{r.attraction.name}</strong>
          <br />
          Note : {r.note} / 5
          <em>{r.commentaire}</em>
        </li>
      ))}
    </ul>
  </main>
  );
}
