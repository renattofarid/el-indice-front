
export interface Slider {
    id:          number;
    categoria:   Categoria;
    title:       string;
    description: string;
    imagen:      string;
    created_at:  string;
}

export interface Categoria {
    id:          number;
    name:        string;
    color:       string;
    description: string;
    image:       string;
    created_at:  string;
}
