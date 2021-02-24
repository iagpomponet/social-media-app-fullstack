import { createContext, useContext, useState} from 'react';


interface AuthContextInterface {
  user: any,
  setUser: Function
}

// TODO - Tipar user ^^^^

export const AuthContext = createContext<AuthContextInterface>({
  user: {},
  setUser: () => {}
});

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
