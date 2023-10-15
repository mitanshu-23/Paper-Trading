import '../../App.css'

export default function Historydata(props){

    console.log(props);
    return(
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th scope='g-col' width='10%'>{props.hdata_p['Stock name']}</th>
                        <th scope='g-col' width='10%'> {parseFloat(props.hdata_p['Buying Price'].toFixed(2))} </th>
                        <th scope='g-col' width='10%'> {parseFloat(props.hdata_p['Selling Price'].toFixed(2))} </th>
                        <th scope='g-col' width='10%'> {parseFloat((+props.hdata_p['Selling Price'] - +props.hdata_p['Buying Price']).toFixed(2))} </th>
                        <th scope='g-col' width='10%'> {props.hdata_p['Quantity']} </th>
                    </tr>
                </thead>
            </table>
        
    )
}