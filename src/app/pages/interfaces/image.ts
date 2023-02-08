export interface Image {
    asset_id:      string;
    public_id:     string;
    format:        Format;
    version:       number;
    resource_type: ResourceType;
    type:          Type;
    created_at:    string;
    bytes:         number;
    width:         number;
    height:        number;
    folder:        string;
    url:           string;
    secure_url:    string;
}

export enum Format {
    GIF = "gif",
    Jpg = "jpg",
    PNG = "png",
    SVG = "svg",
    Webp = "webp",
}

export enum ResourceType {
    Image = "image",
}

export enum Type {
    Upload = "upload",
}
