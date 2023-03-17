// image onto base64
export default function convertToBase64(File) {
    return new Promise((resolve, reject) => {

        const fileReader = new FileReader()
        fileReader.readAsDataURL(File)

        fileReader.onload = () => {
            resolve(fileReader.result)
        }

        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}