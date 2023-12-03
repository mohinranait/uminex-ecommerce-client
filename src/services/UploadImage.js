
import { instancePublic } from "../hooks/useAxiosPublic"


export const uploadImage = async (image) => {
    const formImage = new FormData()
    formImage.append('image', image)
    const {data} = await instancePublic.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_BB_API}`, formImage)
    return data.data.display_url;
}