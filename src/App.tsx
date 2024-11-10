/* CSS */
import './App.css'

/* Imports */
import { useEffect } from 'react'
import { Layout } from 'antd'
import { useData } from './hooks/useData';
import LoginPage from './pages/seguridad/login'
import { useComponents } from './components';

function App() {

  const { contextAuth: { state: { user }, getUser } } = useData()
  const { StyleProvider, HeaderApp, MenuApp, RutasApp } = useComponents()

  useEffect(() => {
    getUser();
  }, [])

  if (!user) {
    return <LoginPage />
  }

  return (
    <StyleProvider>
      <Layout className='h-100 overflow-hidden'>
        <HeaderApp />
        <Layout>
          <MenuApp />
          <Layout className='body-content'>
            <RutasApp />
          </Layout>
        </Layout>
      </Layout>
    </StyleProvider>
  )
}

export default App
