import React, { useState } from 'react';
import PPP from '../TASK/Popup'

const Dashboard = ({ useInfo }) => {
    console.log("Dashboard", useInfo);
    const [status, setStatus] = useState('Start');
    const [index, setIndex] = useState();
    const [data, setdata] = useState({
        Notstarted: useInfo.length,
        Inprogress: 0,
        Resolved: 0,
        Closed: 0,

    });

    const { Notstarted, Inprogress, Resolved, Closed } = data;
    const changeHandler = e => {
        setStatus({ ...data, [e.target.name]: e.target.value })
    }

    const changeTheState = (x, item, i) => {
        setIndex(i)
        if (x === 'Inprogess') {
            setStatus(x)
            setdata(p => ({ ...p, Notstarted: useInfo.length - 1, Inprogress: p.Inprogress + 1 }))
        }
        if (x === 'Resolved') {
            setStatus(x)
            setdata(p => ({ ...p, Inprogress: p.Inprogress - 1, Resolved: p.Resolved + 1 }))
        }
        if (x === 'Closed') {
            setStatus(x)
        }
        if (x === 'remove') {
            setStatus('Start')
            setdata(p => ({ ...p, Resolved: p.Resolved - 1, Closed: p.Closed + 1 }));
            const index = useInfo.indexOf(item);
            // console.log("iiiiiii==>", x, index)
            useInfo.splice(index, 1)
            if (index !== -1) localStorage.setItem('Dashboard',useInfo)
        }
    }
    return (
        <div className='Dashboard'>
            <h1>TICKET SYSTEM</h1>
            {/* onSubmit={submitHandler} */}
            <form >
                <label>Notstarted :</label> <input type="text" name="Notstarted" onChange={changeHandler} value={Notstarted || useInfo.length} />
                <label>In Progress :</label> <input type="text" name="Inprogress" onChange={changeHandler} value={Inprogress} />
                <label>Resolved :</label> <input type="text" name="Resolved" onChange={changeHandler} value={Resolved} />
                <label>Closed :</label> <input type="text" name="Closed" onChange={changeHandler} value={Closed} />
               
                {/* <input type="submit" name="submit" /><br /> */}
              
            </form>

            {/* <button>Add</button> */}
            <div className='Table'>
                <center>
                    <table border='4'>
                        <tr>
                            <th>TICKET ID</th>
                            <th>TITLE</th>
                            <th>CATEGORY</th>
                            <th>PRIORITY</th>
                            <th>DUE DATE</th>
                            <th>STATUS</th>
                            <th>ACTIONS</th>

                        </tr>
                        {
                            useInfo.map((item, i) =>
                                <tr key={i}>
                                    <td>{i}</td>
                                    <td>{item.Title}</td>
                                    <td>{item.Category}</td>
                                    <td>{item.Priority}</td>
                                    <td>{item.Date}</td>
                                    <td>{index === i ? status : 'NotStarted'}</td>
                                    <td>  {(index === i && status === 'NotStarted') ? <button onClick={() => changeTheState('Inprogess', item, i)}>Start</button> :
                                        (status === 'Inprogess' && index === i) ? <button onClick={() => changeTheState('Resolved', item, i)}>Inprogess</button>
                                            : (status === 'Resolved' && index === i) ? <button onClick={() => changeTheState('Closed', item, i)}>Resolved</button> :
                                                (status === 'Closed' && index === i) ? <button onClick={() => changeTheState('remove', item, i)}>Closed</button>
                                                    : <button onClick={() => changeTheState('Inprogess', item, i)}>NotStarted</button>}</td>



                                    {/*                                    
                                   
                                    {status === 'Inprogess' && index === i && <td>  <button onClick={() => changeTheStatu('Resolved', item, i)}>Inprogess</button></td>}
                                    {status === 'Resolved' && index === i && <td>  <button onClick={() => changeTheStatu('Closed', item, i)}>Resolved</button></td>}
                                    {status === 'Closed' && index === i && <td>  <button onClick={() => changeTheStatu('remove', item, i)}>Closed</button></td>} */}

                                    {/* <td><button onClick={() => changeTheStatu(i)}>Inprogess</button></td>
                                    <td><button onClick={() => changeTheStatu(i)}>Resolved</button></td>
                                    <td><button onClick={() => changeTheStatu(i)}>Closed</button></td> */}

                                </tr>
                            )

                        }
                    </table>
                </center>
            </div>
        </div>
    );
}

export default Dashboard;