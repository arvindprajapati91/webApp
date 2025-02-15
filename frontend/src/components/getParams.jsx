import React from 'react';
import { Routes, Route, useParams } from "react-router-dom";

function CreateUpdatePage(props) {
    let params = useParams();
    alert(params)
    return (params)
}

export default CreateUpdatePage;