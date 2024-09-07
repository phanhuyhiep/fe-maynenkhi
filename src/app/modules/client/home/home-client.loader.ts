import { useQuery } from "react-query"
import { getHome } from "../../../services/home.service"


const CACHE_KEYS = {
    InforDataHome: "InforDataHome",
}

export const useGetHome = () => {
    return useQuery([CACHE_KEYS.InforDataHome], ()=>{
        getHome()
    })
}