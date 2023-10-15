import '../../App.css'

export default function Tradesdata(props){

    //const{data} = props;
    //const{keys} = props;
    
    //console.log("Props:",props.data_p,"ID:",props.absid,props.update);
    //const {fun} = props.update;
   // console.log(fun);


    return(
        
        // <div id='main'>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th scope='g-col' width='10%'>{props.data_p['Stock name']}</th>
                        <th scope='g-col' width='10%'> {parseFloat(props.data_p['Buying Price'].toFixed(2))} </th>
                        <th scope='g-col' width='10%'> {parseFloat(props.sp.toFixed(2))} </th>
                       <th scope='g-col' width='10%'> <button onClick={props.update}> Sell</button> </th>
                    </tr>
                </thead>
            </table>
        // </div>
    )
}