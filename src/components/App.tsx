import { Outlet } from 'react-router-dom'
import classes from '@/components/App.module.scss'
import Header from '@/components/Header'

export default function App() {
  return (
  <>
    <Header></Header>
    <main className={classes.main}><Outlet/></main>
  </>
    )
}