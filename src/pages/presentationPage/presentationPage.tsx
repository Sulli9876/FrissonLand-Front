import React from "react";
import { useRootContext } from "../../router/root";

export default function PresentationPage() {
  const { tickets } = useRootContext();

  return (
    <main className="park-page">
      {/* Présentation générale */}

      <section className="presentation-container">

        <h2 className="park-subtitle">Bienvenue à ZombieLand !</h2>
        <h4 className="park-highlight">Plongez dans l’Apocalypse et Déclenchez l’Adrénaline</h4>
        <p className="park-text">
          ZombieLand n’est pas un parc d’attractions comme les autres – c’est une immersion totale
          dans un monde post-apocalyptique où seuls les plus courageux oseront s’aventurer...
        </p>

        </section>
        <div className="park-all">
        <section className="park-intro">
        <h3 className="park-section-title">Ce qui vous attend :</h3>

        <h4 className="park-highlight">Attractions Époustouflantes</h4>
        <p className="park-text">
        enez tester vos nerfs sur nos attractions à sensations fortes, inspirées des plus grands films d'horreur et de science-fiction. Qu'il s'agisse de montagnes russes effrayantes ou de parcours dans des labyrinthes hantés, préparez-vous à une dose intense de frissons.
        </p>

        <h4 className="park-highlight"><strong>Spectacles Horrifiques</strong></h4>
        <p className="park-text">Assistez à des spectacles palpitants où les zombies, les créatures cauchemardesques et les effets spéciaux se mêlent pour vous offrir un show spectaculaire. Nos acteurs, tous plus convaincants les uns que les autres, vous garantissent une expérience immersive hors du commun.</p>

        

        <h4 className="park-highlight">Réservez Votre Aventure !</h4>
        <p className="park-text">e laissez pas l’angoisse vous empêcher de vivre l’aventure ultime. Réservez vos billets en ligne dès maintenant et choisissez parmi une gamme d’options adaptées à vos préférences. Que vous soyez amateur de sensations fortes ou simple curieux, nous avons ce qu'il vous faut </p>

        

        <h4 className="park-highlight">Soyez Prêt Pour l’Inattendu !</h4>
        <p className="park-text">ZombieLand est plus qu'un simple parc – c'est une aventure que vous n’oublierez jamais. Réunissez vos amis, affrontez vos peurs et plongez dans un monde où chaque instant est une surprise. Nos équipes sont prêtes à vous offrir une expérience mémorable, alors venez tester vos limites ! </p>

        <h4 className="park-highlight"><strong>Oserez-vous franchir les portes de ZombieLand ?</strong></h4>

        <p className="park-text">Découvrez dès maintenant notre site pour plus d’informations et pour réserver votre place dans l’univers le plus terrifiant que vous ayez jamais connu. Vous ne le regretterez pas !</p>

        <h4 className="park-highlight">Contact & Informations</h4>
        <p className="park-text">Pour toute question ou besoin d’assistance, n’hésitez pas à nous contacter via notre formulaire en ligne ou notre messagerie dédiée. Nous sommes là pour vous aider à rendre votre expérience à ZombieLand aussi excitante et agréable que possible. </p>
      </section>

      {/* Informations pratiques et tarifs */}
            <div className="park-right">
                    <section className="park-infos">
                        <div className="park-tarifs">
                        <h3 className="park-section-title">Tarifs</h3>
                        {tickets.map((ticket) => (
                            <div key={ticket.name} className="park-tarif-item">
                            <p className="park-tarif-price">{ticket.name} : {ticket.value}€ la journée</p>
                            <p className="park-tarif-condition">
                                *Condition : Annulation possible jusqu’à 7 jours avant la visite.
                            </p>
                            </div>
                        ))}
                        </div>

                        <div className="park-horaires">
                        <h3 className="park-section-title">Horaires d'ouverture</h3>
                        <div className="park-schedule">
                            <p><span className="day">Lundi au jeudi :</span> 10h00 - 22h00</p>
                            <p><span className="day">Vendredi et Samedi :</span> 10h00 - 00h00</p>
                            <p><span className="day">Dimanche :</span> 10h00 - 20h00</p>
                            <p><span className="day">Vacances :</span> 10h00 - 00h00 tous les jours</p>
                        </div>
                        </div>
                    </section>
            
            </div>
        </div>
    </main>
  );
}
