export type TGuitar = {
    id: number
    name: string
    image: string
    description: string
    price: number
}

export type TCartItem = TGuitar & { //Hereda los atributos de TGuitar
    quantity: number
}

//Si queremos coger X atributos
/*
export type TCartItem2 = Pick<TGuitar, 'id' | 'name' | 'price'>

export type TCartItem2 = Pick<TGuitar, 'id' | 'name' | 'price'> & {
    quantity: number
}

export type TCartItem2 = Omit<TGuitar, 'image' | 'description'>
*/

/*
export interface IGuitar {
    id: number
    name: string
    image: string
    description: string
    price: number
}

export interface ICartItem extends IGuitar { //Hereda los atributos de IGuitar
    quantity: number
}
*/