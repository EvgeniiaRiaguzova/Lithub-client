import axios from "axios"

const API_URL = /*process.env.REACT_APP_API_URL || */"http://localhost:5005";

export function TextUpload ({setProfileImage}){


    const uploadImage = async (image) => {
        const storedToken = localStorage.getItem('authToken');
        console.log("tes")
        return await axios.post(`${API_URL}/upload`, image ,/*{ headers: { Authorization: `Bearer ${storedToken}`}}*/ )
        .then((res)=> setProfileImage(res.data.fileUrl))
        .catch(err => console.log(err))
    }

    const handleFileUpload = async (e) => {
        const file = new FormData()
        file.append("imageUrl", e.target.files[0])
        console.log(e.target.files[0])
        uploadImage(file)
        .then((response) => {
            console.log(response)
            setProfileImage(response.path)
        })
        .catch(err => console.log(err)) 
    }

    return(
        <input type="file" name="imageUrl" onChange={handleFileUpload} />
    )
}