import { notify } from "./notify";

export const validateURL = ( ref, str ) => {
     const pattern = new RegExp(
          "^(https?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
          "i"
     );

     if ( ref.current.value.length < 1 ){
          notify( 'The input felds cannot be empty!', 'warning' );
          ref.current.select();
          return false;
     }; 
     
     // if ( !!pattern.test( str ) ){
     //      notify( 'Invalid URL!', 'warning' );
     //      ref.current.select();
     //      return false;
     // };
     
     notify( 'Invalid URL!', 'warning' );
     ref.current.select();
     return !!pattern.test( str );
};

export const validate = ( ref ) => {
     if( ref.current.value.length < 1 ) {
          ref.current.select();
          return false;
     };

     return true;
}