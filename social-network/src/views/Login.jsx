import React, { Component } from 'react';
import { firebase } from '../firebase';
import Logo from '../img/logo.png';
import Brujo from '../img/brujo.png'


class Login extends Component {
    constructor() {
        super();
        this.state = {
            user: null
        };
        
        this.handleAuth=this.handleAuth.bind(this);
        this.handleLogout=this.handleLogout.bind(this);
    }
    /* Mediante este método verificamos si el user tiene algún contenido y si tiene contenido actualizamos el estado
    y el componente se vuelve a renderizar*/ 
    
    componentWillMount () {
        firebase.auth().onAuthStateChanged(user => {
            this.setState ({ user });   
        })
    }
    // Función para iniciar Sesión
    handleAuth () {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
        .then(result => console.log(`${result.user.email} ha iniciado sesión`))
        .catch(error => console.log(`Error ${error.code}: ${error.message}`));
    }
    // Función para Cerrar Sesión
    handleLogout () {
        firebase.auth().signOut()
        .then(result => console.log(`${result.user.email} ha cerrado sesión`))
        .catch(error => console.log(`Error ${error.code}: ${error.message}`));
    }
    // Función que verifica si el usuario esta logueado o no
    renderLoginButton () {
        // Si el usuario esta logueado
        if (this.state.user) {
            return (
                <div>
                   <img src={this.state.user.photoURL} alt={this.state.user.displayName} /> 
                    <p>Hola {this.state.user.displayName}</p>
                    <button onClick={this.handleLogout}>Cerrar Sesión</button>

                </div>
            );
        } else {
            //Si no lo está
            return (
<button onClick={this.handleAuth}>Login con Google</button> 
            );
            
        }
    }
    render () {
        return(
            <div className="loginPage">
                <img className="imgLogo" alt="logo" src={Logo} />
                <input type="text" className="login" id="correo" placeholder="Correo Electrónico" required />
                <input type="text" className="password" id="contraseña" placeholder="Contraseña" required />
                <button className="btn">Iniciar Sesión</button>  
                <img className="brujo" alt="brujo" src={Brujo} />   
                { this.renderLoginButton() }
            </div>
        );
    }
}

export default Login;