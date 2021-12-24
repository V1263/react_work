import React, { useState } from 'react';
import './App.css'
import Dashboard from './TASK/Dashboard';
import Popup from './TASK/Popup';

const App = () => {
  const [data, setFormdata] = useState({
    Title: "",
    Description: "",
    Category: "",
    Priority: "",
    Date: "",
    Status: "",
  });

  const [open, setopen] = useState(false);

const totalData =localStorage.getItem('Dashboard') ? JSON.parse(localStorage.getItem('Dashboard')) : [] ; 
console.log('locall===>11',totalData);

  const changeHandler = e => {
    if (e.target.name === 'Date') {
      if (new Date(e.target.value) >= new Date())
        setFormdata({ ...data, [e.target.name]: e.target.value })
    } else
      setFormdata({ ...data, [e.target.name]: e.target.value })
  }

  const submitHandler = e => {
    console.log('onSubmit==>', data);
    localStorage.setItem(Dashboard, 'Dashboard');
    // let Dashboard = localStorage.setItem("Dashboard");
    // console.log(JSON.parse(Dashboard), "Dashboard");

    
    e.preventDefault();
    if (data.Title.length <= 2 || !data.Title) {
      alert('Please select an item in Title');
    }
    else if (!data.Description || data.Description.length <= 0) {
      alert('Description shouldnt be empty');
    }
    else if (!data.Category) {
      alert('Please select an item in category');
    }
    else if (!data.Priority) {
      alert('Please select an item in Priority');
    }
    else if (!data.Date) {
      alert('Please select an item in Date');
    }

    else {
      // const priviousData =localStorage.getItem('Dashboard') ?  localStorage.getItem('Dashboard') : []
       totalData.push(data)
      localStorage.setItem('Dashboard',JSON.stringify(totalData));
console.log('locall===>',JSON.stringify(totalData));
      setopen(false)
      setFormdata({
        Title: " ",
        Description: " ",
        Category: " ",
        Priority: " ",
        Date: " ",
        Status: " ",
      })
    }
  }
  console.log("submitHandler==>1", totalData)

  return (

    <div className='App'>
      <button onClick={() => setopen(true)}> ADD TICKET </button>
      <Dashboard  useInfo={totalData?.length > 0 ? totalData : []} />

      <form onSubmit={submitHandler}>

        {open && <Popup

          content={
            <div>
              <header className='main'> <h4>TICKET SYSTEM </h4></header>

              <div className='contanier'>
                <div className='row'>

                  <div className='col-lg-6'>
                    Title : <input name="Title" value={data.Title} onChange={changeHandler} type='text' />
                  </div> <br />

                  <div>
                    Description:<textarea name='Description' type='textarea' rows={4} cols={30} value={data.Description} onChange={changeHandler} />
                  </div> <br />

                  <div className='col-lg-6'>
                    Choose Category :<select name='Category' onChange={changeHandler}>
                      <option value="None">None</option>
                      <option value="Lan Issue">Lan Issue</option>
                      <option value="Cable Issue">Cable Issue</option>
                      <option value="Laptop Charger Issue">Laptop Charger Issue</option>
                      <option value="Laptop Battery Issue">Laptop Battery Issue</option>
                    </select>
                  </div> <br />

                  <div className='col-lg-6'>
                    Priority :<input type='radio' name='Priority' value='high' onChange={changeHandler} /><label>High</label>
                    <input type='radio' name='Priority' value='medium' onChange={changeHandler} checked /><label>Medium </label>
                    <input type='radio' name='Priority' value='low' onChange={changeHandler} /><label>low</label>
                  </div> <br />

                  <div className='col-lg-6'>
                    Due Date:<input type="date" name="Date" value={data.Date} onChange={changeHandler} />
                  </div> <br />

                  <div className='col-lg-6'>
                    <footer className='submit'>
                      <button className='Can' type="submit" onClick={() => setopen(false)}> Cancel </button>
                      <input className='sub' type="submit" name="submit" /><br />
                    </footer>
                  </div>

                </div>
              </div>

            </div>}
        />}
      </form>

    </div >
  );


}
export default App;