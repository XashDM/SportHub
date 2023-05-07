import CryptoJS from "crypto-js"
export default function hashPassword(password) {
    const hash = CryptoJS.HmacSHA256(password, process.env.REACT_APP_PASSWORD_SECRET_KEY)
    return hash.toString(CryptoJS.enc.Hex)
}
