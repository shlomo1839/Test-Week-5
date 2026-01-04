import { client, ObjectId } from "mongodb";



export async function registerUser (req, res) {
    try {
        const { username, password }  = req.body
    
        // validtion
        if (!username || !password) {
            return res.status(404).json({ error: "missing usernama or passsword"})
        }

        const mongoCon = req.mongoDBcon;

        // check if exists
        const existsUser = await mongoCon.collection('users').findOne({username});
        if (existsUser) {
            return res.status(500).json({error: "username allready exists"})
        }

        // const collection = await mongoCon.cpllection('users')
        // const usersid = await collection.find({ _id: new ObjectId(id)})

        const newUser = {
            username: username,
            password: password,
            encryptedMessagesCount: 0,
            createdAt: new Date()
        }

        const result = await mongoCon.collection("users").insertOne(newUser);
        // res.json(`id: ${newUser.id}, username: ${newUser.username}`)
        res.status(201).json({
            id: result.insertedId,
            username: newUser.username
        })
    } catch (error) {
        console.log(error);
        
    }
}
export async function getMyProfile(req, res){
    const user = req.user;
    res.status(200).json({
    username: user.username, 
    encryptedMessagesCount: user.encryptedMessagesCount
    });
}