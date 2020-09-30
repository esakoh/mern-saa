
const getTime = () => {

    const today = new Date();

    return (

       today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()+' klo '+today.getHours()+':'+(today.getMinutes()<10?'0':''+today.getMinutes())
    
    );
    
}
 
export default getTime;