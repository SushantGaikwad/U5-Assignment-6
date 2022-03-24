import React, {useState,useEffect } from "react";
import "./Forms.css";

const Forms = ()=>{
    const [formData, setFormData] = React.useState({
        name : "",
        age : "",
        address : "",
        department : "",
        salary : "",
        isMarried : false,
    });
    const [employee, setEmployee] = useState([]);

    useEffect(()=>{
        getData();
    },[])

    const handleChange = (e) =>{
        // console.log("Id",e.target.id);
        // console.log("Value",e.target.value);
        const {id, value,checked, type} = e.target;
        // console.log(id,value);
        setFormData({
            ...formData,
            [id] : type === "checkbox" ? checked : value
        })
    }

    
    const getData = ()=>{
        fetch(`http://localhost:3001/employee`)
        .then((res) => res.json())
        .then((res) => setEmployee(res))
        .then((err) => console.log(err));
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        // console.log(formData);
        let payload = JSON.stringify(formData);
        fetch(`http://localhost:3001/employee`,{
            method : "POST", 
            body : payload,
            headers :{
                "content-type" : "application/json"
            }
        })
        .then((res)=>{
            getData();
        })
        
    }

    const {name, age, address, department, salary, isMarried} = formData;
    return (
        <div>
            <h1>Employee Form</h1>
            <form onSubmit={handleSubmit}>
                <span>Name : </span>
                <input id="name" type="text" placeholder="Enter Name" onChange={handleChange} value = {name} />
                <br />
                <span>Age : </span>
                <input id="age" type="number" placeholder="Enter Age" onChange={handleChange} value={age} />
                <br />
                <span>Address : </span>
                <input id="address" type="text" placeholder="Enter Name" onChange={handleChange} value={address} />
                <br />
                <span>Department : </span>
                <select  name="Department" id="department" onChange={handleChange} value={department}>
                    <option value="">Select Department</option>
                    <option value="IT"> IT </option>
                    <option value="Finance"> FInanace </option>
                    <option value="Account"> Account </option>
                    <option value="Marketing">Marketing </option>
                </select>
                <br />
                <span>Salary : </span>
                <input id="salary" type="number" placeholder="Enter Salary" onChange={handleChange} value={salary} />
                <br />
                <span>Marital Status</span>
                <input id="isMarried" type="checkbox" onChange={handleChange}  checked={isMarried}/>
                <br />
                <input type="submit" value="Submit" />
            </form>

            {
                employee.map((item,index)=>(
                    <div key={index} className="emp-div">
                        <div> <span>Name: </span>{item.name}</div>
                        <div> <span>Age : </span>{item.age}</div>
                        <div> <span>Address : </span>{item.address}</div>
                        <div> <span>Department: </span>{item.department}</div>
                        <div> <span>Salary: </span>{item.salary}</div>
                        <div> <span>Marital Status: </span>{item.isMarried ? "Yes" : "No"}</div>
                    </div>
                ))
            }
        </div>
    )
}

export {Forms}