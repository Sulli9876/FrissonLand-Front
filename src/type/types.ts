export interface Iattractions{
    id : string;
    name : string;
    description : string;
    image : string;
    duration : string;
    category_id: 1

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
  }
export interface Icategory{
    id : string;
    name : string;
    
}
export interface Iticket {
    id: number;
    value: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface TicketsResponse {
    tickets: Iticket[];
}

export interface Ibooking {
    id : string
    reservation_number: string;
    visit_date: string;
    quantity: Record<number, number>; // 'Record<number, number>' indique que c'est un objet avec des clés de type number et des valeurs de type number
    ticket_id : number;
    user_id : number;
    totalPrice: number; // Ajoutez ceci

  }

  export interface Iuser {
    id: number;
    name: string;
    email: string;
    address: string;
    password: string;
    created_at: string;
    updated_at: string;
  }

export type RootContext = {
    attractions: Iattractions[];
    tickets : Iticket[];
    categories: Icategory[];
    setAttractions: React.Dispatch<React.SetStateAction<Iattractions[]>>;
    setTickets:React.Dispatch<React.SetStateAction<Iticket[]>>;
    setCategories: React.Dispatch<React.SetStateAction<Icategory[]>>;
  };