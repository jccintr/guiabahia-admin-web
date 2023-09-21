import { createContext,useState } from "react";
//import Api from '../api/Api';



const DataContext = createContext({});

export const DataProvider = ({children}) => {
    const [logged,setLogged] = useState(true);
   
  

/*
const getToken = async () => {
      
       const token = localStorage.getItem('token');
       console.log('token '+token);
            if(token){
              let response = await Api.getUser(token);
              if (response.status===200){
                 let jsonUser = await response.json(); 
                 setApiToken(token);
                 setLoggedUser(jsonUser);
                 setLogged(true);
                 
               }  

            }

  }

   

useEffect(() => {
    getToken();
  }, []);

*/


  return (
      <DataContext.Provider value={{
        logged
       
      }}>
        {children}
      </DataContext.Provider>
  )

}

export default DataContext;
