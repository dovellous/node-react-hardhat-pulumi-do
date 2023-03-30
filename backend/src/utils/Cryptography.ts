const crypto = require("crypto");

const fs = require('fs');

const algorithm = 'aes-256-cbc';

const key = crypto.randomBytes(32);

const iv = crypto.randomBytes(16);

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: "pkcs1",
        format: "pem",
    },
    privateKeyEncoding: {
        type: "pkcs1",
        format: "pem",
    },
});

const saveCertificates = () => {
    fs.writeFileSync("./cert/dvs.mern.services.public.pem", publicKey);
    fs.writeFileSync("./cert/dvs.mern.services.private.pem", privateKey);
}

fs.exists("./cert", (exists:boolean)=>{
    if(!exists){
        fs.mkdir("./cert", ()=>{
            saveCertificates();
        });
    }else{
        saveCertificates();
    }
    
});

const encryptData = (text: string) => {
    
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
    
}

const decryptData = ( text: any) => {
    
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();

}

const md5 = ( data: any ) => {
    
    const hash = crypto.createHash('md5');
    
    hash.update(data);
    
    return hash.digest('hex');
    
}

const sha256 = ( data: any ) => {
    
    const hash = crypto.createHash('sha256');
    
    hash.update(data);
    
    return hash.digest('hex');
    
}

export {md5, sha256, encryptData, decryptData, publicKey, privateKey}