import { useFetch } from "../hooks/useFetch";
import Loader from "./Loader";
import Message from "./Message";

const SelectList = ( { title, url, handleChange } ) => {

    const { data, isPending, error } = useFetch(url);

    if(!data) return null;
    if(error) {
        return <Message 
        msg= {`Error ${error.status}: ${error.statusText}`}
        bgColor= "#dc3545"
        />
    };

    let id = `select-${title}`;
    let label = title.charAt(0).toUpperCase() + title.slice(1);

    //Esta variable es debido a la forma en que presentan los datos en la API
    let options = data.response[title];

    return(
        <>
            <label htmlFor={id}>{label}</label>
            {/* Renderizado condicional */}
            {isPending && <Loader/>}
            <select name={id} id={id} onChange={handleChange}>
                <option value="">Elige un {title}</option>
                {/* Renderizado condicional dinámico */}
                {data && options.map((e)=> <option value={e} key={e}>{e}</option>)}
            </select>
        </>
    )
};

export default SelectList


