import React, { useState } from "react";
import { ethers } from "ethers";
import "./WalletCard.css"

export default function WalletCard() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const [conButtonText, setConButtonText] = useState("Connect Wallet");

    const connectWalletHandler = () => {
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(rs => {
                    accountChangedHandler(rs[0]);
                })
        } else {
            setErrorMessage("Install Metamask");
        }
    }

    const accountChangedHandler = (newAccount) => {
        setDefaultAccount(newAccount);
        getUserBalabce(newAccount.toString());
    }

    const getUserBalabce = (address) => {
        window.ethereum.request({ method: 'eth_getBalance', params: [address, 'latest'] })
            .then(balance => {
                setUserBalance(ethers.utils.formatEther(balance));
            })
    }

    const chainChangedHandler = () => {
        window.location.reload();
    }

    window.ethereum.on('accountsChanged', accountChangedHandler);

    window.ethereum.on('chainChanged', chainChangedHandler)

    return (
        <div className="wrapped">
            <div className="walletCard">
                <h2>{"Test Connection To Metamask"}</h2>
                <button onClick={connectWalletHandler}>{conButtonText}</button>
                <div className="accountDisplay">
                    <h3>Address: {defaultAccount}</h3>
                </div>
                <div className="balanceDisplay">
                    <h3>Balance: {userBalance}</h3>
                </div>
                {errorMessage}
            </div>
        </div>

    )
}
