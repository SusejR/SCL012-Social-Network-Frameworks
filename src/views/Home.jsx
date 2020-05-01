import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { db, firebase } from '../firebase';
import M from "materialize-css";
import Juego from '../img/miJuego.jpg';

const styles= {
    navBar: {
        paddingLeft: '5%',
        paddingRight: '5%'
    },
    createPost: {
        borderRadius: '25px',
        border: '2px, solid, red',
        padding: '20px',
        width: '1000px',
        height: '30px'
      },
      btnPublic: {
        marginTop:'2%',
        marginBottom:'2%'
      }
}
export default class Home extends Component {
  
        state = {
            posts:[],
            inputValue:"",
            edit:false,
            id:"",
            notification:false,
            message:"",
        }
    
    
        componentDidMount() {
            
                // Auto initialize all the things!
                M.AutoInit();
            
            db.collection("userPosts").onSnapshot((snapShots) => {
                this.setState({
                    posts:snapShots.docs.map(doc => {
                        return {id:doc.id, data:doc.data()}
                    })
                })
            })
        }
    // Función para Cerrar Sesión
    handleLogout () {
    firebase.auth().signOut()
    .then(result => console.log(`${result.user.email} ha cerrado sesión`))
    .catch(error => console.log(`Error ${error.code}: ${error.message}`));
}
    //Función que actualiza el estado para colocarle el valor que tiene el input de comentario
    changeValue = (e) => {
        this.setState({
            inputValue:e.target.value
        })
    };
    // función que permite guardar el post nuevo en la colección de firebase
    savePost = () => {
        const { inputValue, edit } = this.state;
        !edit ?
        db.collection("userPosts").add({
            post:inputValue
        }).then(()=>{
            this.message('agregado');
        }).catch(()=>{
            this.message('error')
        }) :
        this.update();
        this.setState({
         inputValue:"",
        })
    }
    //Función que toma el id del documento, y  muestra el documento en el input para que pueda ser editado
    getPosts= (id) => {
        let docRef = db.collection("userPosts").doc(id);
        docRef.get().then((doc)=>{
            if(doc.exists){
                this.setState({
                    inputValue:doc.data().post,
                    edit:true,
                    id:doc.id
                })
            }else {
                console.log('El documento no existe')
            }
        }).catch((error)=> {
            console.log(error);
        })
     }
    //Función que actualiza el post editado
    update = () => {
        const { id, inputValue } = this.state;
        db.collection("userPosts").doc(id).update({
            post: inputValue
        }).then(() => {
            this.message('actualizado');
        }).catch((error) => {
            this.message('error');
        })
    } 

    //Función que elimina el post seleccionado
    deletePost = (id) => {
        db.collection("userPosts").doc(id).delete();
    }
    message = (message) => {
        this.setState({
            notification:true,
            message: message
        })
    }
    render() {
        const { posts, inputValue, notification, message } = this.state;
        return(
            <fragment>
                <nav>
                            <div style={styles.navBar} className="navBar nav-wrapper orange">
                            <a href="#" className="brand-logo black-text">SP</a>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><a href="sass.html"className='black-text'><strong>Inicio</strong></a></li>
                                <li><a href="badges.html" className='black-text'><strong>Mi Perfil</strong></a></li>
                               
                                <li><Link to='/'> <a onClick={this.handleLogout} className='black-text'><strong>Cerrar Sesión</strong></a></Link></li>
                                 
                                
                            </ul>
                            </div>
                        </nav>
                    
                <div className='container'>
                    
                  
                      <div className="createPost">
                     <h5 className="orange-text"><strong>Realizar una Nueva Publicación</strong></h5>
                     <input style={styles.createPost} type='texto'   value={inputValue} onChange={this.changeValue}/> 
                     <button style={styles.btnPublic}  className="btn orange" onClick={this.savePost}>Publicar</button>
                     </div>
                    
               
                 <div className="showPost">
                     {posts && posts !== undefined ? posts.map((post, key)=>{
                         return (
                             <div className='row' key={key}>
                                 <div className='col s12 m6'>
                                     <div className='card grey darken-4'>
                                         <div className='card-content'>
                                         <h4 className="white-text">{post.data.post}</h4>
                                 <button className="btn orange" onClick={() => this.getPosts(post.id)}>Editar</button>
                                 <button className="btn orange" onClick={() => this.deletePost(post.id)}>Eliminar</button>
                                  
                                         </div>
                                     </div>
                                 </div>

                                 
                             </div>
                         )
                     }): null}
                 
                 </div>  
               
            </div>  
            
            </fragment>
            
        );
    }

}
