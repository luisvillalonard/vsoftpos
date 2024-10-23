/* CSS */
import './App.css'

/* Imports */
import { useEffect } from 'react'
import { Layout } from 'antd'
import { useData } from './hooks/useData';
import LoginPage from './pages/seguridad/login'
import RutasApp from './components/rutas'
import { Content } from 'antd/es/layout/layout'
import StyleProvider from './components/providers/styles';
import MenuApp from './components/layout/menu';
import HeaderApp from './components/layout/header';

function App() {

  const { contextAuth: { state: { user }, getUser } } = useData()

  useEffect(() => {
    getUser();
  }, [])

  if (!user) {
    return <LoginPage />
  }

  return (
    <StyleProvider>
      <Layout className='vh-100'>
        <HeaderApp />
        <Layout>
          <MenuApp />
          <Content style={{ overflow: 'auto', padding: 16 }}>
            <RutasApp />
          </Content>
        </Layout>
      </Layout>
    </StyleProvider>
  )
}

export default App
