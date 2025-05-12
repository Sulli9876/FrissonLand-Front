export interface Iattractions{
    id : string;
    name : string;
    description : string;
    image : string;
    duration : string;
    category_id: 1

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

export type RootContext = {
    attractions: Iattractions[];
    tickets : Iticket[];
    setAttractions: React.Dispatch<React.SetStateAction<Iattractions[]>>;
    setTickets:React.Dispatch<React.SetStateAction<Iticket[]>>;
  };