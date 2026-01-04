import { ObjectId } from "bson";

export async function encryptMessage(req, res) {
    try {
        const { message, cipherType } = req.body;
        const user = req.user
        const mysqlConn = req.mysqlDbConn;
        const mongoCon = req.mongoDbConn;


        if (!message || !cipherType){
            res.status(400).json({error: "missing message or cipherType"})
        }

        let encryptText = "";
        const type = cipherType.toUpperCase();


        if (type !== 'REVERSE') {
            return res.status(400).json({ error: "Only 'REVERSE' cipher is supported currently" });
        }

        const encryptedText = message.split('').reverse().join('').toUpperCase();
        
        const [result] = await dbMysql.query(
            'insert into messages (username, cipher_type, encryptedText) values (?, ?, ?)',
            [user.username, type, encryptedText]
        )
        await mongoCon.collection('users').updateOne(
            { username: user.username },
            { $inc: { encryptedMessagesCount: 1 } }
        );

        res.status(201).json({
            id: result.insertId,
            cipherType: type,
            encryptedText: encryptedText
        });

            await collection.insertOne(newEncrypt)
            res.status(201).json({ successful: newEncrypt})
        } catch (error) {
            console.log(error);
        }
}

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