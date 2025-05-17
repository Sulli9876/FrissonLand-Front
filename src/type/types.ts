
export interface Iattractions{
    id : number;
    name : string;
    description : string;
    image : string;
    duration : string;
    category_id: number;

}
export interface Ireviews {
    id: number;
    note: number;
    commentaire: string;
    userId: number;
    attractionId: number;
    createdAt: string; // c'est une date en format ISO
    updatedAt: string;
    user: {
      id: number;
      first_name: string;
      last_name: string;
    };
    attraction: {
      id : string;
    name : string;
    description : string;
    image : string;
    duration : string;

    };
  }
export interface Icategory{
    id : number;
    name : string;
    
}
export interface Ibooking {
  id: number;
  reservation_number: string;
  visit_date: string;        // format ISO date string, ex: "2025-05-15"
  ticketId: number;          // correspond à ticket.id (attention au camelCase)
  quantity: number;  
  ticket: Iticket;  
  user : Iuser      // nombre de billets pour ce ticket dans cette réservation
}

export interface Iticket {
  id: number;
  name: string;
  value: number; 
}

export interface TicketsResponse {
    tickets: Iticket[];
}

export interface IReservationGroup {
  reservation_number: string;
  visit_date: string;
  bookings: Ibooking[];
}

  export interface Iuser {
    id: number;
    first_name:  string;
    last_name: string;
    mail: string;
    password: string;
    created_at: string;
    updated_at: string;
  }
export interface MyJwtPayload {
  id: string;
  role: string;
  // ajoute d'autres champs que ton token contient
};

export type RootContext = {
    attractions: Iattractions[];
    tickets : Iticket[];
    categories: Icategory[];
    setAttractions: React.Dispatch<React.SetStateAction<Iattractions[]>>;
    setTickets:React.Dispatch<React.SetStateAction<Iticket[]>>;
    setCategories: React.Dispatch<React.SetStateAction<Icategory[]>>;
  };
  