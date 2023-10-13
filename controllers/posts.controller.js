//import model
const Post = require("../models/post.model")

module.exports.create = (req, res) => {
    //console.log(req.body)
    Post.create(req.body)
    .then((post) =>{
        return res.status(201).json(post);
    })
    .catch((error) =>{
        return res.status(400).json({ message: `Error creating post: ${error}`});
    })
    
};

module.exports.list = (req, res) => {
    Post.find()
        .then((posts)=>{
            return res.status(200).json(posts);
        })
        .catch((error) =>{
            return res.status(400).json({ message: `Error listing post: ${error}`});
        }) 
};


module.exports.detail = (req, res) => {
    const id = req.params.id;
    Post.findById(id)
        .then((post)=>{
            if(post){
                return res.status(200).json(post);
            } else{
                return res.status(404).json({message: "Post doesnt exist"});
            }
        })
        .catch((error) =>{
            return res.status(400).json({ message: `Error listing post: ${error}`});
        })
}

module.exports.update = (req, res) => {
    const id = req.params.id;
    const body = req.body;
    Post.findByIdAndUpdate(id, body,{
        new: true,
        runValidators: true
    })
        .then((post)=>{
            if(post){
                return res.status(200).json(post);
            } else{
                return res.status(404).json({message: "Post doesnt exist"});
            }
        })
        .catch((error) =>{
            return res.status(400).json({ message: `Error updating post: ${error}`});
        })
}

module.exports.delete= (req, res) => {
    const id = req.params.id;
    Post.findByIdAndDelete(id)
        .then((post)=>{
            if(post){
                return res.status(204).json();
            } else{
                return res.status(404).json({message: "Post doesnt exist"});
            }
        })
        .catch((error) =>{
            return res.status(400).json({ message: `Error listing post: ${error}`});
        })
}

//-------------------------------------------------------------------------------------------
module.exports.filter = (req, res) => {

    const criteria = {};
    const filter = req.query.author;
    if(filter){
        criteria.author = new RegExp(req.query.author, "i");
    }
    Post.find(criteria)
        .then((posts)=>{
            if(posts.length > 0){
                return res.status(200).json(posts);
            } else{
                return res.status(404).json({message: "Author doesnt exist"});
            }
        })
        .catch((error) =>{
            return res.status(400).json({ message: `Error listing post: ${error}`});
        })
};