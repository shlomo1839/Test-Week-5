import { ObjectId } from "bson";

export async function encryptMessage(req, res) {
    try {
        const { message, cipherType } = req.body;
        const user = req.user
        const conn = req.mysqlDbConn;



        if (!message){
            res.status(400).json({error: "invalid"})
        }
        const encryptedText = message.split('').reverse().touppercase()
        
        const [result] = await dbMysql.query(
            'insert into messages (username, cipher_type, encryptedText) values (?, ?, ?)',
            [user.username, 'reverse', encryptedText]
        )
        await user.updateOne({ _id: user._id })

        res.status(201).json({
            id: result.Id,
            cipherType: 'REVERSE',
            encryptedText: encryptedText
        });

            await collection.insertOne(newEncrypt)
            res.status(201).json({ successful: newEncrypt})
        } catch (error) {
            console.log(error);
        }
    
r    }

export async function decryptMessage(req, res) {
    try {
        const { messageId } = req.body;
        const [rows] = await dbMysql.query('select * from messages where id = ?', [messageId]);

        if (rows.length === 0) {
        return res.status(404).json({ error: 'message not found' });
        }

        const decryptedText = msgData.encrypted_text.split('').reverse().join('');

        res.status(200).json({
            id: msgData.id,
            decryptedText: decryptedText
        });
    } catch (err) {
        console.log(err);
        
    }
}