class Property {
    name: String
    min: number
    max: number
    unit: String

    constructor(name: String, min: number, max: number, unit: String) {
        this.name = name;
        this.min = min;
        this.max = max;
        this.unit = unit;
    }

    get value(): String {
        let randomNumber = String(this.#randomNumber());
        if (this.unit == "#") {
            return this.unit + String(parseInt(randomNumber).toString(16));
        } else if (this.unit == "direction") {
            console.log(randomNumber);
            if (parseInt(randomNumber) > 5) {
                return "forwards";
            }
            return "reverse";
        }

        return randomNumber + this.unit;
    }

    #randomNumber(): number {
        return Math.round(Math.random() * (this.max - this.min) + this.min);
    }

}

export default Property;