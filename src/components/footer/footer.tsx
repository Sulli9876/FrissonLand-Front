import React from 'react';
import { NavLink } from 'react-router-dom';



export default function HomePage() {
  return (
    <>
<footer>
<div className="footer_nav">
<NavLink to="/MentionsLegales" className="mentions_link">Mentions légales</NavLink>
<NavLink to="/Contact" className="contact-link">Contact</NavLink>
</div>

</footer>
    </>
  );
}