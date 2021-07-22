import React, { useEffect, useState } from 'react';
import LinkForm from './LinkForm';

import { db } from '../firebase';
import { notify } from '../helpers/notify';

export const Links = () => {
     const[ links, setLinks ] = useState([]); 
     const[ currentId, setCurrentId ] = useState('');

     const addOrEditLink = async( linkObject ) => {
          try {
               if ( currentId === '' ) {
                    await db.collection( 'links' ).doc().set( linkObject );
     
                    notify( 'New link added.', 'info' );
               } else {
                    await db.collection( 'links' ).doc( currentId ).update( linkObject );
     
                    notify( 'Link successfully updated.', 'info');
     
                    // limpia el currentId
                    setCurrentId('');
               };
          } catch ( error ) {
               console.log( error );
          };
     };

     const onDeleteLink = async( id ) => {
          if (window.confirm('Are you sure that you want to delete?')) {
               await db.collection( 'links').doc( id ).delete();

               notify( 'Link deleted!', 'error' );
          };
     }

     const getLinks = () => {
          db.collection( 'links' ).orderBy( 'date' )
          .onSnapshot(( querySnapshot ) => {
               const docs = [];
               querySnapshot.forEach(( doc ) => {
                    docs.push({...doc.data(), id: doc.id});
               });

               // reverse ordena el array a la inversa.
               setLinks(docs.reverse());
          });
     };

     useEffect(() => {
          getLinks();
     }, []);

     return (
          <div>
               <div>
                    <LinkForm {...{ addOrEditLink, currentId, links, notify }}/>
               </div>
               <div className="col">
                    { links.map( link => (
                         <div className="card my-3" key={ link.id }>
                              <div className="card-body">
                                   <div className="d-flex flex-row justify-content-between">
                                        <h2 className="text-warning text-uppercase"><b>{ link.name }</b></h2>
                                        <div className="d-flex p-1">
                                             <button 
                                             className="btn btn-primary d-flex align-items-center m-1">
                                                  <i 
                                                  className=" material-icons "
                                                  onClick={() => setCurrentId( link.id )}
                                                  >
                                                       edit
                                                  </i>
                                             </button>
                                             <button
                                             className="btn btn-danger d-flex align-items-center m-1">
                                                  <i 
                                                  className=" material-icons"
                                                  onClick={() =>  onDeleteLink( link.id )}
                                                  >
                                                       close
                                                  </i>
                                             </button>
                                        </div>
                                   </div>
                                   <p className="p-2 mt-3 border">
                                        <b>Description:</b> 
                                        <br />
                                        { link.description }</p>
                                   <a
                                   className="btn btn-primary block w-100"
                                   href={ link.url } 
                                   target="_blank" 
                                   rel="noopener noreferrer">Go to Website
                                   </a>
                              </div>
                         </div>
                    ))}
               </div>
          </div>
     );
};