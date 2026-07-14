export type Estatus = "confirmada" | "pendiente" | "cancelada";

export type Reservation = {
  id: string;
  created_at: string;
  nombre: string;
  telefono: string;
  /** yyyy-mm-dd */
  fecha: string;
  /** HH:mm:ss */
  hora: string;
  personas: number;
  estatus: Estatus;
  notas: string | null;
};

/** Shape accepted by the public reservation form insert. */
export type ReservationInsert = {
  nombre: string;
  telefono: string;
  fecha: string;
  hora: string;
  personas: number;
  notas?: string | null;
  estatus?: Estatus;
};
