import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header";
import People from "./People";
import Load from "./Load";
import { useEffect, useState } from "react";
import "antd/dist/antd.css";

function App() {

    const [ personList, setPersonList ] = useState([])

    const loadPeople = ()=>{
        console.log("call load");
    }

    const fetchPeople = ()=>{
        console.log("call fetch");
    }

    const { Content, Footer } = Layout;

    return (
        <Layout className="layout">
            <Header />
            <Content style={{ padding: "0 50px" }}>
                <div className="site-layout-content" style={{ margin: "100px auto" }}>

                </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>Yonatan ©2022.</Footer>
        </Layout>
    )
}

export default App;
