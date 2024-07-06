export interface user {
    [x: string]: any;
    email?: string ,
    name?: string ,
    address?: string ,
    password?: string,
    id?: string,
    verification?:string,

}

export interface userveri {
    [x: string]: any;
    email?: string ,
    name?: string ,
    address?: string ,
    password?: string,
    id?: string,
    verification?:string,
}


export interface cours {
    [x: string]: any;
    description?: string ,
    name?: string ,
    chapitre?: string ,
    imageprof?: string,
    id?: string,
    chap?:string
}


export interface trainer{
    [x: string]: any;
    description?: string ,
    name?: string ,
    degre?: string ,
    imagetrainer?: string,
    id?: string,
}



export interface event{
    [x: string]: any;
    description?: string ,
    name?: string ,
    time?: string ,
    imageevent?: string,
    id?: string,
}

export interface claim{
    [x: string]: any;
    subject?: string ,
    name?: string ,
    email?: string ,
    message?: string,
    id?: string,
}


export interface mycourses{
    [x: string]: any;
    description?: string ,
    name?: string ,
    chapitre?: string ,
    imageprof?: string,
    id?: string,
    chap?:string
}

export interface coursprofile{
    [x: string]: any;
    description?: string ,
    name?: string ,
    chapitre?: string ,
    imageprof?: string,
    id?: string,
    chap?:string,
    veri?:string,
}

export interface wouh{
    [x: string]: any;
    description?: string ,
    name?: string ,
    chapitre?: string ,
    imageprof?: string,
    id?: string,
    chap?:string
}


export interface addnewuseradmin {
    [x: string]: any;
    email?: string ,
    name?: string ,
    address?: string ,
    password?: string,
    id?: string,
    verification?:string,

}

export interface forum{
    [x: string]: any;
    subject?: string ,
    name?: string ,
    message?: string,
    id?: string,
}
