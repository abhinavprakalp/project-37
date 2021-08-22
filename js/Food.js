class Food {
    constructor(foodStock,lastFed){}
    
    foodStock=foodStock;
    lastFed=lastFed;
    image = loadImage("Milk.png");
    getFoodStock(){
        var foodStockRef = database.ref('Food');
        foodStockRef.on("value",function(data){
            Food=data.val();
        })
    }

    update(food){
        database.ref('/').update({
            foodStock:food
        });
    }

    deduct(){
    }

    display(){
        var x=80,y=100;
        imageMode(CENTER);
        image(this.image,720,220,70,70);

        if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10==0){
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
        }
    }

}