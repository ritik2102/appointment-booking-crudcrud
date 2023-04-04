const User=require('../models/users');


// Adding the users
exports.postUser=async (req,res,next)=>{
    const name=req.body.name;
    const email=req.body.email;
    const phone=req.body.phone;

    const data=await User.create({name: name,email: email,phone: phone});
    res.status(201).json({resData: data});
}

// getting the users
exports.getUsers=async(req,res,next)=>{
    User.findAll()
        .then((users)=>{
            console.log(users);
            res.status(201).json({resData:users})
        })
        .catch(err=>{
            console.log(err);
        });
};

// Deleting the users
exports.deleteUser=(req,res,next)=>{

    const userId=req.params.userId;

    User.findByPk(userId)
        .then(user=>{
            console.log(user);
            return user.destroy();
        })
        .then(result=>{
            console.log('Deleted the user');
            res.status(201);
        })
        .catch(err=>{
            console.log(err);
        })
}

exports.getUser=(req,res,next)=>{

    const userId=req.params.userId;

    User.findByPk(userId)
    .then(user=>{
        console.log(user);
        res.status(201).json({resData : user});
    })
    .catch(err=>{
        console.log(err);
    })
}

