import { ObjectId } from "bson";

export async function encryptMessage(req, res) {
  
}

export async function decryptMessage(req, res) {

}

export async function encryptMessage(text) {
    const con = req.mysqlDbConn
    try {
        if (!text) {
            return
        }
        if (text === null)
            return
        text.reverse().touppercase()
    } catch (error) {
        console.log(error)
    }
}

