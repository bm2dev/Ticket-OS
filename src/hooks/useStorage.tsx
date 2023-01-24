import cryptoJs from 'crypto-js';

export default function useStorage() {

    function encrypt(text: string) {
        return cryptoJs.AES.encrypt(text, '@bil123').toString();
    }

    function decrypt(text: string) {
        return cryptoJs.AES.decrypt(text, '@bil123').toString(cryptoJs.enc.Utf8);
    }

    function setStorage(key: string, item: string) {

        const encryptedString = encrypt(item);

        localStorage.setItem(key, encryptedString);
    }

    function getStorage(key: string) {

        const encryptedString = localStorage.getItem(key);

        if (!encryptedString) return null;

        return decrypt(encryptedString);
    }

    return { getStorage, setStorage };
}
