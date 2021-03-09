// BUILD YOUR SERVER HERE]
const User = require(`./users/model`);
const express = require('express');

const server = express()

server.use(express.json());


///Gets user by specific id from databse. 

server.get('/api/users/:id', ( req, res ) => {
    const { id } = req.params;

    User.findById( id ) 
        .then( user => {
            if( !user ){
                res.status( 404 ).json({ message: "The user with the ID doesn't not exist"})
            } else {
                res.json( user );
            }
        })
        .catch( err => res.status(500).json({message:"User information not retrieved."}))
})



///Gets all users from database


server.get(`/api/users/:id`, ( req, res) => {
    User.find()
        .then(users => {
            res.status( 200 ).json( users )
        })
        .catch( err => status( 500 ).json({message: "Users information not retrieved."}))
})

///Creates a new user from JSON. adds to database.


server.post(`/api/users`, ( req, res ) => {
    const newUser = req.body;

    if( !newUser.name || !newUser.bio){
        res.status(400).json({ message: "Please give name and bio"});
    } else {
        User.insert( newUser )
            .then( user => {
                res.status( 201 ).json(user);
            })
            .catch( err => res.status( 500 ).json({ message: "Error with saving user to database"}))
    }
})

///Edit and Updates specific user's id in database.

server.put(`/api/users/:id`, ( req, res ) => {
    const { id } = req.params;
    const updates = req.body;

    User.update( id, updates )
        .then(user => {
            if( !updates.name || !updates.bio ){
                res.status( 400 ).json({ message: "Please provide name and bio for user"})
            } else {
                res.status( 400 ).json( user );
            }
        })
        .catch( err => res.status( 500 ).json({message:"User information can't be modified"}))
})

server.delete(`/api/users/:id`, ( req, res ) => {
    const { id } = req.params;
    

    User.remove( id )
        .then( user => {
            if( !user ){
                res.status(404).json({ message: "The user with the specific ID does not exist"})
            } else {
                res.status(200).json({ message:`User Deleted.`, data: user})
            }
        })
        .catch( err => res.status( 500 ).json({ message: "The user could not be removed"}));
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
