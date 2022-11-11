export class Product {
    constructor(
        public id_: string,
        public category: string,
        public title: string,
        public description: string,
        public condition: string,
        public imageURL: [string],
        public price: number,
        public sold: boolean,
        public enable: boolean,
        public deliveryMethod: string,
        public creationDate: string,
        public publishedDate: string,
        public expiryDate: string,
        public userName: string,
        public questionAnswer: [ {question: string, answer: string} ]
    ) { }
}