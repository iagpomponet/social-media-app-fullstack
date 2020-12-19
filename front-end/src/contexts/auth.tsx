import { createContext, useContext, useState} from 'react';



export const AuthContext = createContext({});

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState({ signed: false });

  return (
    <AuthContext.Provider value={{
      user,
      setUser
    }}>
     {children}
   </AuthContext.Provider>
  )
}

// auth hook
export function useAuth(){
  const context = useContext(AuthContext);

  return context;
}


export default AuthProvider;