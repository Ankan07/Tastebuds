var mongoose=require('mongoose');
const express=require('express');
var app=express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());


var a=require('lodash');
mongoose.Promise=global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Food')
const port=process.env.PORT || 3000;
var Groups= new mongoose.Schema({


rid:{
  type: Number
},

groups:[
  {
    groupname:{
      type:String

    },
    gid:{
      type:Number
    },
    items:[Number]

  }
]
});
var Group = mongoose.model('Group',Groups);

var Foods= new mongoose.Schema({

  fid:{
    type:Number
  },

foodname:{
  type:String
},
rid:{
  type:Number
},
price:Number,
// Gid:{
//   type:Number
// },
Genre:{
  type:String
},
tags:[String],
othertype:{type:String},
veg:{
  type:Boolean
},
Rating:{
  type:Number
},
Review:[
  {
    userid:{
      type:Number
    },
    review:{
      type:String
    },
    rating:{
      type:Number
    }
  }
]


});
var Food= mongoose.model('Food',Foods);

var Restaurants=new mongoose.Schema({

rid:{
  type:Number
},
  name:{
    type:String
  },
  address:{
    type:String
  },
  phno:Number,
  homedelivery:Boolean,
  menu:[
    {
      groupname:{
        type:String
      },
      items:[
        {name:String,
        price:Number,
        fid:Number
      }
      ]
    }
  ],
  payment:{
    type:String
  }

},{strict:false
});
var Restaurant= mongoose.model('Restaurant',Restaurants);
app.post('/restaurants',(req,res)=>{

//  var body=a.pick(req.body,['rid','name','address','payment','menu']);
var r=new Restaurant(req.body);
r.save().then((doc)=>{
  return res.send(doc)
}).catch((e)=>{
  console.log(e);
  res.send(400).send(e);
})
});
app.post('/foods',(req,res)=>{

  var body=a.pick(req.body,['fid','foodname','rid','Genre','tags','othertype','price','veg']);
var t=new Food(body);
t.save().then((doc)=>{
  return res.send(doc)
}).catch((e)=>{
  console.log(e);
  res.send(400).send(e);
})
});

app.post('/foods/edit/:id',(req,res)=>{
var t=req.params.id;

console.log(t);

  var body=a.pick(req.body,[ 'tags','price']);
  var sd=new Food(body);
  console.log(sd);
  Food.findOne({fid:t}).then((food)=>{
    if(!food){
      return res.status(404).send();
    }
    var arr=sd.tags;
     var arr2=food.tags;
     var newarr=arr2.concat(arr);
 var arr3=Array.from(new Set(newarr));

      food.tags=arr3;
      var newprice=sd.price;
      food.price=newprice;
      console.log(food.price);
food.save();
      return res.send(food);
  }).catch((e)=>{
    console.log(e);
  })

});


app.post('restaurants/edit/:id',(req,res)=>{
  var p=req.params.id;
  var body=a.pick(req.body,['menu']);
  var sd=new Restaurant(body);
  Restaurant.findOne({rid:p}).then((restaurant)=>{
    if(!restaurant){
      return res.status(404).send();
    }
    restaurant.menu
  })
})

//Restaurant.find({hew:{$in:[12]}}).then((restaurant)=>{console.log(restaurant)})

// Restaurant.find({price:450}).then((restaurant)=>{restaurant.price=349;
// restaurant.save();
//  }).catch((e)=>{console.log(e);});
// Restaurant.find({h:{
// a:{$in:[12]}}).then((restaurant)=>{
//
// console.log(restaurant);
//
//
// })
// Restaurant.aggregate([{ $addFields:{nonvegt:"yes" }},{$out:"Restaurant"}]);
//
// app.get('/me',(req,res)=>{
//
//
//
//
//
//    Restaurant.find({}).then((restaurant)=>{
//
// var big=restaurant.h;
// var bug=big.a;
// bug.push("kiwi",12,{pride:23});
// restaurant.save();
// res.send(restaurant);
//
//
//
//
//
// }).catch((e)=>{
//   console.log(e);
//    });
//   //  res.send(restaurant);
//      // Restaurant.findOne({rid:food.rid}).then((restaurant)=>{
//      //   console.log(restaurant.name);
//      })











app.listen(port,()=>{
  console.log('Started ');

});
