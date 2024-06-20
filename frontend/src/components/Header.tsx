import { Link } from "react-router-dom";

const Header = () => {

    const logout = () => {

    }

  return (
        <div style = {{display:'grid' ,gridTemplateColumns:'1fr 1fr' ,justifyContent:'space-between',margin:'2%'}}>
                <div>
                    <span> Kagaaz </span>
                </div>
                <div style = {{display:'flex',justifyContent:'end' }}>
                    <button onClick={logout} style={{padding:'1% 3%'}}> Logout </button>
                    <div>
                        <Link to = "/create" > Write Now </Link>
                    </div>
                </div>
        </div>
  )
}

export default Header