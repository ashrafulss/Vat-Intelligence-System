


export interface Taxpayer{
  id: number;
  name: string;
}


export interface Circle{
  id: number;
  name: string;
  taxpayer: Taxpayer[];
}


export interface Division{
id: number;
name: string;
circle: Circle[];
}

export interface Commissioner {
    id: number;
    name: string;
    description: string;
    division: Division[]; 
  }
  



