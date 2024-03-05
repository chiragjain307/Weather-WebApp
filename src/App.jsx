import Weather from './Components/Weather'
import background from './assets/background.jpg'
function App() {

  return (
    <>
    <div 
    className='bg-slate-800 h-[100vh] flex justify-center items-center'
    style={{
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
    <Weather/>
    </div>
    </>
  )
}

export default App
