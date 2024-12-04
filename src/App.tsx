import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { ReactNode } from "react"
import { Header } from "./components/Header"
import { Shedule } from "./pages/Shedule"
import { Marks } from "./pages/Marks"
import { Profile } from "./pages/Profile"
import { Login } from "./pages/Login"
import { useSelector } from "react-redux"
import { RootState } from './app/store';
import { Register } from "./pages/Register"
import { VerifyRegistration } from "./pages/VerifyRegistration"
import { useMyProfileQuery} from "./app/services/user"

function ProtectedRoute({ children }: { children: ReactNode }) {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  return accessToken ? <>{children}</> : <Navigate to="/login" replace />;
}

function App() {
  const location = useLocation();
  const emailUser = useSelector((state: RootState) => state.auth.email)
  const {data: myProfile, isLoading, isError} = useMyProfileQuery({email: emailUser!})

  // if (isLoading) {
  //   return <div>Loading...</div>; // Загрузочный экран
  // }

  // if (isError) {
  //   return <div>Error loading profile. Please try again lfsdfsd</div>; // Ошибка
  // }

  return (
    <div className="min-h-screen flex flex-col">
      {(location.pathname !== "/login" && location.pathname !== "/register" && location.pathname !== "/verify-registration") && <Header id={myProfile?.id} />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/verify-registration' element={<VerifyRegistration />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Shedule id={myProfile?.id} />
          </ProtectedRoute>
        } />
        <Route path="/marks" element={
          <ProtectedRoute>
            <Marks id={myProfile?.id} />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile id={myProfile?.id} />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}

export default App