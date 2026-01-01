import { client, ObjectId } from "mongodb";



export async function registerUser (req, res) {
    try {
        const { username, password, id }  = req.body
    
        const mongoCon = req.mongoDBcon;
        const collection = await mongoCon.cpllection('users')
        const usersid = await collection.find({ _id: new ObjectId(id)})

        const newUser = {
            username: username,
            password: password,
            id: usersid
        }

        await mongoCon.collection("users").insertOne(newUser)
        res.json(`id: ${newUser.id}, username: ${newUser.username}`)
    } catch (error) {
        console.log(error);
        
    }
}
export async function getMyProfile(req, res){
    try {
        const [ rows ] = await dbMysql.query('select id cihper_type, encrypted_text from messages where username = ?', [req.user.username]);
        res.status(200).json({ items: rows });
    } catch (error) {
        console.log(error);
    }
}