import {useEffect} from "react";
import "./Modal.css";
import "./Raccess.css";
const Raccess = ({setRaccessOpen, contract}) => {
  const remove = async () => {
    const address = document.querySelector(".address").value;
    await contract.disallow(address);
    setRaccessOpen(false);
  };
  useEffect(() => {
    const removeaccessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for(let i = 0;i < options.length;i++){
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && removeaccessList();
  }, [contract]);
 return (
    <>
      <div className="darkBG">
        <div className="centered">
          <div className="modalContainer">
            <div className="title">Remove Access for : </div>
            <div className="body">
              <input
                type="text"
                className="address"
                placeholder="Enter Address"
              ></input>
            </div>
            <form id="myForm">
              <select id="selectNumber">
                <option className="address">People With Access</option>
              </select>
            </form>
            <div className="footer">
              <button onClick={() => {
                setRaccessOpen(false);
              }}
              id = "cancelBtn">
                Cancel
              </button>
              <button onClick = {() =>
              remove()}>
                  Remove Access
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Raccess;