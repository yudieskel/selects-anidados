import React, { useState } from "react";
import SelectList from "./SelectList";

const SelectsAnidados = () => {

    const [ state, setState ] = useState("");
    const [ town, setTown ] = useState("");
    const [ suburb, setSuburb ] = useState("");

    //Variable para guardar el token de la API
    const TOKEN = "5fbf5dee-341d-415c-85a7-fb359f5c6e55";

    return(
        <div>
            <h2>Selects Anidados</h2>
            <h3>México</h3>

            <SelectList 
            title="estado" 
            url={`https://api.copomex.com/query/get_estados?token=${TOKEN}`}
            handleChange={(e) => {
                setState(e.target.value)}}
            />

            {/* Renderizado condicional depende del anterior */}
            {state && <SelectList 
            title="municipios" 
            url={`https://api.copomex.com/query/get_municipio_por_estado/${state}?token=${TOKEN}`} 
            handleChange={(e) => {
                setTown(e.target.value)}}
            />}
            
            {/* Renderizado condicional depende del anterior */}
            {town && <SelectList 
            title="colonia" 
            url={`https://api.copomex.com/query/get_colonia_por_municipio/${town}?token=${TOKEN}`} 
            handleChange={(e) => {
                setSuburb(e.target.value)}}
            />}

            <pre>
                <code>
                    {state} - {town} - {suburb}
                </code>
            </pre>
        </div>
    )
};

export default SelectsAnidados