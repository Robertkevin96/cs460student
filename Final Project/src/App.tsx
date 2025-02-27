import './App.css'
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Dice from './components/Dice';
import DistortedImg from './components/DistortedImg';
import InputTest from './components/InputTest';

import Mountains from './images/mountains.jpg'
import City from './images/City.jpg'
import Galaxy from './images/galaxy.jpg'

import { FormEvent, useEffect, useLayoutEffect, useState } from 'react';
import { slugify } from './utils/slugify';


export default function App() {
  const [links, setLinks] = useState([
    ['Mountains', Mountains],
    ['City', City],
    ['Galaxy', Galaxy],
       
  ])
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const routes = links.reduce((prev, cur) => ([...prev, cur[0]]))
    const name = location.pathname.slice(1, location.pathname.length)
    if (name.length > 0 && !routes.includes(name)) {
      navigate('/')
    }
  }, [location])

  const addImage = (e: FormEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files
    if (files) {
        const filename = slugify(files[0].name)
        const fileURL = URL.createObjectURL(files[0])
        setLinks(prev => ([...prev, [filename, fileURL]]))
        navigate(`/${filename}`)
    }

  }


  return (
    <>
      <Routes>
        <Route path='/' >
          <Route  path={''} element={<DistortedImg image={Mountains} />} />
          {links.map(link => <Route key={link[0]} path={link[0]} element={<DistortedImg image={link[1]} />} />)}
        </Route>        
        
      </Routes>
      <nav>
        {links.map(link => <Link key={link[0]} to={`/${link[0]}`}>{link[0]}</Link>)}
        <label htmlFor='img-upload'>
          Browse
        </label>
        <input id='img-upload' type={'file'} onChange={addImage} />
      </nav>
      
    </>
  )
}


