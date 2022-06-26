export interface AnuncioRequest {
    name: string,
    image: string,
    categoria_anuncios_id: number,
    description: string,
    address: string,
    phone: number,
    cellphone: number,
    status: boolean,
    tags: number[],
}

export interface Anuncio {
    id: number;
    name: string;
    image: string;
    categoria_anuncio: CategoriaAnuncio;
    description: string;
    address: string;
    phone: number;
    cellphone: number;
    status: boolean;
    tags: Tag[];
    created_at: string;
}

export interface CategoriaAnuncio {
    id: number;
    name: string;
    color: string;
    description: string;
    created_at: string;
}

export interface Tag {
    id: number;
    name: string;
}
