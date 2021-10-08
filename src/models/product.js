export default class Product {
    /* constructor(name, description, active, stock, stockUnit, barcode, articleNumber, price, supplier) {
        this.name = name;
        this.description = description;
        this.active = active;
        this.stock = stock;
        this.stockUnit = stockUnit;
        this.barcode = barcode;
        this.articleNumber = articleNumber;
        this.price = price;
        this.supplier = supplier;
    } */

    static empty() {
        var newProduct = new Product();
        newProduct.name = '';
        newProduct.description = '';
        newProduct.active = true;
        newProduct.stock = 0;
        newProduct.stockUnit = 'st';
        newProduct.barcode = '';
        newProduct.articleNumber = '';
        newProduct.price = 0;
        newProduct.supplier = [];

        return newProduct;
    }
}
