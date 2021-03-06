// Generated by https://quicktype.io

export interface PostResponse {
    id: number;
    user: User;
    categoria: Categoria;
    title: string;
    slug: string;
    description: string;
    content: string;
    imagen: string;
    published: boolean;
    tags: Tag[];
    anuncios: Anuncio[];
    created_at: Date;
    actions?: string;
}

export interface Anuncio {
    id: number;
    name: AnuncioName;
    image: Image;
    categoria_anuncio: Categoria;
    description: Description;
    address: Address;
    phone: Phone;
    cellphone: Cellphone;
    status: number;
    tags: Tag[];
    created_at: CreatedAt;
}

export enum Address {
    EstSuscipitInExpedita = "Est suscipit in expedita.",
    IureExOccaecatiIn = "Iure ex occaecati in.",
    LiberoAdAdEtNostrum = "Libero ad ad et nostrum.",
    ModiAAutVelEt = "Modi a aut vel et.",
    PariaturUndeQuoNonAlias = "Pariatur unde quo non alias.",
    QuoSedAutFugitIpsaEt = "Quo sed aut fugit ipsa et.",
    SedHarumLaboriosamQui = "Sed harum laboriosam qui.",
    UtEarumRepellatMagni = "Ut earum repellat magni.",
}

export interface Categoria {
    id: number;
    name: CategoriaName;
    color: Color;
    description: string;
    created_at: CreatedAt;
    image?: string;
}

export enum Color {
    Ae91Be = "#ae91be",
    D41E35 = "#d41e35",
    Dd431B = "#dd431b",
    The388487 = "#388487",
    The64982C = "#64982c",
    The67Bd51 = "#67bd51",
    The694284 = "#694284",
    The9B9C3A = "#9b9c3a",
}

export enum CreatedAt {
    The080620222340 = "08-06-2022 23:40",
}

export enum CategoriaName {
    Ab = "ab",
    Cumque = "cumque",
    Eum = "eum",
    Expedita = "expedita",
    Itaque = "itaque",
    Quasi = "quasi",
    Ut = "ut",
    Vero = "vero",
}

export enum Cellphone {
    CatAnd = "Cat; and.",
    Dormouse = "Dormouse.",
    HereOne = "Here one.",
    IShould = "I should.",
    KnaveOf = "Knave of.",
    MSaid = "M?' said.",
    NoIVe = "No, I've.",
    OnWhich = "On which.",
}

export enum Description {
    AliceItMustHaveBeenWasNotAVERYTurnUp = "Alice. 'It must have been was not a VERY turn-up.",
    AndHeAddedInASoothingToneDonTBeAngry = "And he added in a soothing tone: 'don't be angry.",
    FootmanRemarkedTillTomorrowAtThis = "Footman remarked, 'till tomorrow--' At this.",
    IShouldLikeItPutTheDormouseShallThey = "I should like it put the Dormouse shall!' they.",
    IShouldLikeToShowYouALittleBrightEyed = "I should like to show you! A little bright-eyed.",
    MouseOfCourseTheMockTurtleSuddenly = "Mouse. 'Of course,' the Mock Turtle, suddenly.",
    PoorAliceItWasAsMuchAsSheCouldnT = "Poor Alice! It was as much as she couldn't.",
    QueenShoutedAtTheOtherGuineaPigCheered = "Queen shouted at the other guinea-pig cheered.",
}

export enum Image {
    AndSheSSuchA = "And she's such a.",
    CatIfYouDonT = "Cat, 'if you don't.",
    FatherWilliam = "Father William,'.",
    HatterNorI = "Hatter. 'Nor I,'.",
    IAmInTheWind = "I am in the wind.",
    IFindANumberOf = "I find a number of.",
    ItMeansMuchThe = "It means much the.",
    MockTurtleAnd = "Mock Turtle, and.",
}

export enum AnuncioName {
    AliceA = "Alice, a.",
    AliceTo = "Alice to.",
    Dormouse = "Dormouse.",
    FiveI = "Five. 'I.",
    IHadnT = "I hadn't.",
    IVeGot = "I've got.",
    MSaid = "M?' said.",
    SheTook = "She took.",
}

export enum Phone {
    AliceA = "Alice, a.",
    AliceTo = "Alice to.",
    Dormouse = "Dormouse.",
    IGotUp = "I got up.",
    SheSaid = "She said.",
    ThenThe = "Then the.",
    TheyAll = "They all.",
    WhenThe = "When the.",
}

export interface Tag {
    id: number;
    name: TagName;
}

export enum TagName {
    Accusantium = "accusantium",
    Deserunt = "deserunt",
    Destacado = "destacado",
    Dolor = "dolor",
    Est = "est",
    Et = "et",
    Inventore = "inventore",
    Maiores = "maiores",
    Quis = "quis",
    Quod = "quod",
    Rerum = "rerum",
    Ullam = "ullam",
    Ut = "ut",
    Voluptas = "voluptas",
}

export interface User {
    id: number;
    name: string;
    email: string;
    rol: Rol;
    created_at: CreatedAt;
}

export enum Rol {
    Usuario = "usuario",
}
