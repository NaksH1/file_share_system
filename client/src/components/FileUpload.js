import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = ({contract, account, provider}) => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No image selected");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(file){
            try{
                const formData = new FormData();
                formData.append("file", file);

                // const resFile = await axios({
                //     method : 'post',
                //     url : "https://api.pinata.cloud/pinning/pinFileToIPFS",
                //     data : formData,
                //     header: {
                //         pinata_api_key : 'f9ad925a51324792a171',
                //         pinata_secret_api_key : 'af2dfa7db6e32927d829a83bc9ae71c8b42f3b08f1553f2bdb96cd0b555a7bd0',
                //         "Content-Type" : "multipart/form-data",
                //     },
                // });
                const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
                return axios.post(url,
                    formData,
                    {
                        maxContentLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
                        headers: {
                            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                            'pinata_api_key': 'f9ad925a51324792a171',
                            'pinata_secret_api_key': 'af2dfa7db6e32927d829a83bc9ae71c8b42f3b08f1553f2bdb96cd0b555a7bd0'
                        }
                    }
                ).then(function (response) {
                    const resFile = response;
                    const ImgHash = 'http://turquoise-magic-clam-677.mypinata.cloud/ipfs/' + resFile.data.IpfsHash + "?pinataGatewayToken=9QVEFqbxh16oh-LBa2ERk5TI-QKkADpIoAvpg-PyrXwP9W6W2D14TckhxsOtO_ED";
                    contract.add(account, ImgHash);
                    alert("Successfull Image Upload");
                    setFileName("No image selected");
                    setFile(null);
    
                }).catch(function (error) {
                    //handle error here
                });

                // const ImgHash = 'http://turquoise-magic-clam-677.mypinata.cloud/ipfs/' + resFile.data.IpfsHash;
                // contract.add(account, ImgHash);
                // alert("Successfull Image Upload");
                // setFileName("No image selected");
                // setFile(null);

            }
            catch(error){
                alert(error);
            }
        }
    };

    const retrieveFile = (e) => {
        const data = e.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
            setFile(e.target.files[0])
        }
        setFileName(e.target.files[0].name);
    };

    return (
        <div className="top">
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="file-upload" className="choose">
              Choose File
            </label>
    
            <input
              disabled={!account}
              type="file"
              id="file-upload"
              name="data"
              onChange={retrieveFile}
            />
    
            <span className="textArea">  Selected: {fileName}</span>
            <button type="submit" className="upload" disabled={!file}>
               Upload
            </button>
          </form>
        </div>
      );
};
export default FileUpload;