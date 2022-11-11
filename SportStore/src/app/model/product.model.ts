export class Product {
    constructor(
        public _id?: string,
        public category?: string,
        public title?: string,
        public description?: string,
        public condition?: string,
        public imageURL?: [string],
        public price?: number,
        public sold?: boolean,
        public enable?: boolean,
        public deliveryMethod?: string,
        public creationDate?: string,
        public publishedDate?: string,
        public expiryDate?: string,
        public userName?: string,
        public questionAnswer?: [ {question: string, answer: string} ]
    ) { }
    clear() {
        this._id = null;
        this.category = this.title = this.description = null;
        this.condition = this.imageURL = this.price = null;
        this.sold = this.enable = false;
        this.deliveryMethod = this.creationDate = this.publishedDate = null;
        this.expiryDate = this.userName = this.questionAnswer = null;
    }
}