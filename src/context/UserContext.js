import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [User, setUser] = useState({
        isMento: true,
        mentoType: "",
        nickName: "",
        age: 0,
        country: "",
        myInfo: "",
        subjectTag:"",
        etcTag: ""
    });

    const updateUser = (newUser)=>{
        setUser((prevUser)=>{
            return{
                ...prevUser,
                ...newUser
            };
        });
    };

    const resetUser = () => {
        setUser({
            isMento: true,
            mentoType: "",
            nickName: "",
            age: 0,
            country: "",
            myInfo: "",
            subjectTag:"",
            etcTag: ""
          
        });
    };
    return (
        <UserContext.Provider value={{ User, updateUser, resetUser }}>
            {children}
        </UserContext.Provider>
    );
}