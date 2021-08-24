class Food {
    constructor() {
        this.foodStock=0
        this.lastFed
        this.image = loadImage("images/Milk.png")
    }

    updateFoodStock(foodStock) {
        this.foodStock = foodStock
    }

    getFedTime(lastFed) {
        this.lastFed=lastFed
    }

    deductFood() {
        if(this.foodStock > 0) {
            this.foodStock = this.foodStock-1
        }
    }

    getFoodStock() {
        return this.foodStock;
    }

    bedroom(){
        background(bedroomImg)
    }

    washroom(){
        background(washroomImg)
    }

    garden(){
        background(gardenImg)
    }

    display() {
        var x=250,y=60

        imageMode(CENTER)
        image(this.image,355,530,70,70)

        if(this.foodStock!=0) {
            for(var i=0; i<this.foodStock; i++) {
                if(i%10==0){
                    x=250;
                    y=y+50
                }
                image(this.image,x,y,50,50)
                x=x+30
            }
        }

        

    }
}