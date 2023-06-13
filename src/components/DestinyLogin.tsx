import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const DestinyLogin = () => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    // const navigate = useNavigate();
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
    const redirectUri = process.env.REACT_APP_REDIRECT_URI_LOCAL || 'fart';

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code');
      
        if (code) {
            const getAccessToken = async () => {
                try {
                    console.log('I am a fart');
                    const response = await axios.post("https://www.bungie.net/platform/app/oauth/token/",
                        {
                            grant_type: "authorization_code",
                            client_id: clientId,
                            client_secret: clientSecret,
                            code: code,
                            redirect_uri: redirectUri
                        },
                        {
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            }
                        }
                    );

                    console.log(response)

                    setAccessToken(response.data.access_token);
                } catch (error) {
                    console.error("Error in token request: ", error);
                }
            };

            getAccessToken();
        }
    }, []);

    const handleLogin = () => {
        window.location.href = `https://www.bungie.net/en/OAuth/Authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}`;
        console.log(`https://www.bungie.net/en/OAuth/Authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}`);
    };

    if (accessToken) {
        return (
            <div>
                <h2>Access Token:</h2>
                <p>{accessToken}</p>
            </div>
        );
    }

    return (
        <div>
            <button onClick={handleLogin}>Login with Destiny</button>
        </div>
    );
};

export default DestinyLogin;