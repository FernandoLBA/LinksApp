import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import { validateURL, validate } from '../helpers/validate';

const LinkForm = ( props ) => {

     const initialStateValues = {
          url: '',
          name: '',
          description: '',
          date: ''
     };

     const [ values, setValues ] = useState( initialStateValues );
     const inputUrlRef = useRef();
     const inputNameRef = useRef();

     const handleInputChange = (e) => {
          const { name, value } = e.target;
          setValues({ ...values, [ name ]: value, date: new Date().getTime() });
     };

     const handleSubmit = ( e ) => {
          e.preventDefault();

          // if (!validateURL( inputUrlRef ,values.url )) {
          //      inputUrlRef.current.select();

          //      return props.notify('Invalid URL!', 'warning');
          // }; 

          if ( !validateURL( inputNameRef, values.url ) ){
               console.log('false')
               return;
          };
          
          if ( !validate( inputNameRef ) ){
               console.log('también false')
               return;
          };

          // if( !validate( inputNameRef ) ){
          //      console.log(validate( inputNameRef ));
          //      return props.notify('The input fields cannot be empty!', 'warning');
          // };


          // if (inputNameRef.current.value.length < 1) {
          //      inputNameRef.current.focus();

          //      return props.notify('The inputs fields cannot be empty!', 'warning');
          // }

          props.addOrEditLink( values );
          // limpia el formulario
          setValues({...initialStateValues});
     };

     const getLinkById = async( id ) => {
          const doc = await db.collection( 'links' ).doc( id ).get();

          // Al editar carga los valores al formulario
          setValues({ ...doc.data() });
     }

     useEffect(() => {
          if(props.currentId === '') {
               setValues({ ...initialStateValues });
          } else {
               getLinkById( props.currentId );
          }
     }, [ props.currentId ]);

     return (
          <form className="card card-body" onSubmit={ handleSubmit }>
               <h1 className="text-warning mb-3 text-center">- LINKS -</h1>
               <div className="form-group input-group">
                    <div className="input-group-text bg-light">
                         <i 
                         className="material-icons text-secondary"
                         >insert_link</i>
                    </div>
                         <input 
                         ref= { inputUrlRef }
                         type="text" 
                         className="form-control" 
                         placeholder="https://fernando.com" 
                         name="url"
                         onChange={ handleInputChange }
                         value={ values.url }
                    />
               </div>

               <div className="form-group input-group my-3">
                    <div className="input-group-text bg-light">
                         <i className="material-icons text-secondary">input</i>
                    </div>
                    <input ref={ inputNameRef } type="text" className="form-control" name="name" placeholder="Website Name" onChange={ handleInputChange } value={ values.name }/>
               </div>

               <div className="form-group">
                    <textarea name="description" rows="3" className="form-control" placeholder="Write a Description" onChange={ handleInputChange } value={ values.description }></textarea>
               </div>

               <button className="btn btn-success btn-block mt-3" type="submit">
                    { props.currentId === '' ? 'Save' : 'Update' }
               </button>
          </form>
     );
};

export default LinkForm;