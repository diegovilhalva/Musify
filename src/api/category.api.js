import { getData } from "../config/axios.config.js";
import { getUrlQuery } from "../helpers/helpers.utils.js";


export const getSeveralDetail = async (req) => {
    const {offset,limit,page} = getUrlQuery(req.params)

    const {data:{categories}} = await getData(`/browse/categories?limit=${limit}&offset=${offset}&locale=pt_BR`,req.cookies.access_token)

    return {baseUrl:req.baseUrl,page,name:'Explore',...categories}
}

 
export const getDetail = async (req) => {
    const {categoryId} = req.params

    const {data:catInfo} = await getData(`/browse/categories/${categoryId}?locale=pt_BR`,req.cookies.access_token)

    return  catInfo
}