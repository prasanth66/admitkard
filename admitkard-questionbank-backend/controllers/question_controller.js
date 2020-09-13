const Questions = require('../models/Questions');


module.exports.addQuestion=async function(req,res){
    try {
           await  Questions.create({
            query:req.body.query,
            topic:req.body.topic,
            tags:req.body.tags
        })

        return res.json("addquestion");
    } catch (error) {
        console.log("error in adding question ",error);
        return res.json(500,{
            message:"internal server error"
        });
    }
}

module.exports.fetchQuestion=async function(req,res){
    try {
        
        
   

        let questions=await Questions.find({}).sort({createdAt: 'desc'});
       
        return res.json(200,{
            questions:questions
        })

    } catch (error) {
        console.log("error in adding question ",error);
        return res.json(500,{
            message:"internal server error"
        });
    }
}
