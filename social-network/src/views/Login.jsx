import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { firebase } from '../firebase';
import Logo from '../img/logo.png';
import Brujo from '../img/brujo.png';
import '../css/login.css';




 export default class Login extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         user: null
    //     };
        
    //     this.handleAuth=this.handleAuth.bind(this);
    //     this.handleLogout=this.handleLogout.bind(this);
    // }
    // /* Mediante este método verificamos si el user tiene algún contenido y si tiene contenido actualizamos el estado
    // y el componente se vuelve a renderizar*/ 
    
    // componentWillMount () {
    //     firebase.auth().onAuthStateChanged(user => {
    //         this.setState ({ user });   
    //     })
    // }
    // Función para iniciar Sesión
    handleAuth () {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
        .then(result => console.log(`${result.user.email} ha iniciado sesión`))
        .catch(error => console.log(`Error ${error.code}: ${error.message}`));
    }
    
    // Función que verifica si el usuario esta logueado o no
    
    render () {
        return(
                <div className="principalDiv">
                    <div>
                     <div className="imgLogo"> <img style={{width:'400px'}} alt="logo" src={Logo} /> </div>
                     
               <div className='center'>
               <h6 className="mail orange-text"><strong>E-mail:</strong></h6>
               <input type='texto' className="input grey darken-3" id="correo" required />
               <h6 className="password orange-text"><strong>Password:</strong></h6>
               <input type='texto' className="input grey darken-3" id="contraseña" required />
                 </div>
               <div className='button'>
               <Link to='/Home'> 
                    <button className="btnLogin btn grey darken-3  orange-text"><strong>Login</strong></button>
                    <button className="btn grey darken-3  orange-text" onClick={this.handleAuth}><strong>Login with Google</strong></button>
                    </Link>    
                    </div>
                    <div className="imgBrujo">
                    <img alt="brujo" src={Brujo} /> 
                    </div>
                      
                 </div>
          
                </div>
                  
          
        );
    }
}
