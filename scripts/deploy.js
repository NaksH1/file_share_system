const hre = require("hardhat");

async function main() {
    const Upload = await ethers.getContractFactory("Upload");
    const upload = await Upload.deploy();
    await upload.waitForDeployment();
    const address = upload.address;
    
    console.log("Library deployed to: ", address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});