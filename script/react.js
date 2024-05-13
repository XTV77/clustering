const rootElement = document.getElementById("data__inputs");

function generateGird(countOFrows, countOFcolumns) {
  const rows = [];
  const columns = [];
  const identifier = [];
  for (let i = 0; i < countOFrows; i++) {
    identifier.push(
      <input className='identifier' placeholder='name' type='text'></input>
    );
    rows.push(<input className='row' type='number'></input>);
  }
  columns.push(<div className='column'>{identifier}</div>);
  for (let i = 0; i < countOFcolumns; i++) {
    columns.push(<div className='column'>{rows}</div>);
  }
  ReactDOM.createRoot(rootElement).render(columns);
}

//////////////////////////////////////////////////////////////////
//*************************************************************//
//***********************EvenListener*************************//
//***********************************************************//
//////////////////////////////////////////////////////////////

document
  .querySelector(".get-rows-columns__button")
  .addEventListener("click", () => {
    setTimeout(
      generateGird(
        parseFloat(localStorage.getItem("countOFrows")),
        parseFloat(localStorage.getItem("countOFcolumns"))
      ),
      10
    );
  });

//////////////////////////////////////////////////////////////////
//*************************************************************//
//************************************************************//
//***********************************************************//
//////////////////////////////////////////////////////////////
generateGird(
  parseFloat(localStorage.getItem("countOFrows")),
  parseFloat(localStorage.getItem("countOFcolumns"))
);
