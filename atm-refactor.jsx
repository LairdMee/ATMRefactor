const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  
    const choice = ['Deposit', 'Cash Back'];
    console.log(`ATM isDeposit: ${isDeposit}`);
   /*  console.log(`Isvalid: ${isValid}`); */
    return (  
      <label className="label huge">
        {/* <h2 className="isdeposit"> {choice[Number(!isDeposit)]}</h2> */}
        <br/>
        <div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text">$</span>
  </div>

        <input id="number-input" type="number" width="200" onChange={onChange} class="form-control" ></input>

        <div class="input-group-append">
    <span class="input-group-text">.00</span>
  </div>
</div>

        <input type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid} class="btn btn-primary"></input>
        {!isValid &&  
         <h6 class="warningMessage">Withdrawal exceeds balance</h6>
        }
        


      </label>
    );
  };
  
  const Account = () => {
    const [deposit, setDeposit] = React.useState(0);
    const [totalState, setTotalState] = React.useState(0);
    const [isDeposit, setIsDeposit] = React.useState(true);
    const [atmMode, setAtmMode] = React.useState("");
    const [validTransaction, setValidTransaction] = React.useState(true);
  
    let status = `Account Balance $ ${totalState} `;
    console.log(`Account Rendered with isDeposit: ${isDeposit}`);
    
    const handleChange = (event) => {
      console.log(`handleChange ${event.target.value}`);
      console.log(`totalstate ${totalState}`);
      console.log(`${atmMode}`);
      setDeposit(Number(event.target.value));

      
      if(Number(event.target.value)<=0)
      {setValidTransaction(false);
      return;}
      if(atmMode == "Cash Back" && Number(event.target.value)>totalState)
      {
        setValidTransaction(false);
        
      }
      else{
        setValidTransaction(true);
       
      }
      console.log(`${validTransaction}`);
    };
    const handleSubmit = (event) => {
      let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
      setTotalState(newTotal);
      setValidTransaction(true);
      event.preventDefault();
    };
    const handleModeSelect = (event) => {
      console.log(`handeModeSelect ${event.target.value}`);
      setAtmMode(event.target.value);
      console.log(`handleModeSelect ${atmMode}`);
      if(event.target.value=="Cash Back")
      {
        setIsDeposit(false);
      }
      else if(event.target.value=="Deposit")
      {
        setIsDeposit(true);
      }
      else{
        setIsDeposit(isDeposit);
      }
    }
    console.log(`${validTransaction}`);
    return (
      <form onSubmit={handleSubmit}>
        
        
        <label>Select an action below to continue...</label>
<select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select" class="custom-select" size="3">
<option id="no-selection" value=""></option>
<option id="deposit-selection" value="Deposit">Deposit</option>
<option id="cashback-selection" value="Cash Back">Cash Back</option>
</select>

        {/* <button onClick={() => setIsDeposit(true)}>Deposit</button>
        <button onClick={() => setIsDeposit(false)}>Cash Back</button> */}

        
       
        {atmMode && <div><ATMDeposit onChange={handleChange} isDeposit={isDeposit} validTransaction={validTransaction} isValid={validTransaction}>
          </ATMDeposit></div>}
          <h2 id="total">{status}</h2>
      </form>
      
    );
  };

  
  
  // ========================================
  ReactDOM.render(<Account />, document.getElementById('root'));