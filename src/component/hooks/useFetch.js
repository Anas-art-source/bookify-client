import  { useCallback, useState} from "react";



export default function useFetch () {
        const [isLoading, setIsLoading] = useState(false);
        const [isValid, setIsValid] = useState(true);
        const [error, setError] = useState("")

        const sendRequest = useCallback(async (URL, METHOD, data = null, formData=false) => {
                setIsLoading(true)
                let sendData;
                if (formData) {
                    sendData = {
                        method: METHOD,
                        credentials: 'include',
                        body: data ? data : ""
                    }
                } 
                if (!formData) {
                   sendData =  { 
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        method: METHOD ? METHOD : "GET",
                        credentials: 'include',
                        body: data ? JSON.stringify(data) : ""
                        
                    }
                }

                // GET REQUEST DOESNOT NEED ANY HEADERS
                if (METHOD === 'GET') {
                    sendData = {
                        method: 'GET',
                        credentials: 'include'
                    }
                }

             try {
                //  console.log(...FORMDATA, METHOD, "CHECKING FOR FORMDATA")
                const response = await fetch(URL, sendData)
                console.log(response, "RESPONSE AT FETCH")

                // ERROR NOT THROW HERE BECAUSE IN API WE ALREADY HAS CAPTURE MAJORITY OF ERROR
                // AND WE HAVE ALSO SEND THEN AS VALID RESPONSE
                // THEREFORE ERROR ARE CATCH AFTER PARSING RESPONSE

                // if (!response.ok) {
                //     console.log(response, "RESPNSE")
                //     throw new Error(`${response.status} ${response.statusText}`)
                // }

                const data = await response.json();
                
                // CATCHING ERROR THROW DATA.ERR
                if (data.err) {
                    throw new Error(`${data.message}`)
                }

                setIsLoading(false);
                setIsValid(true);
                console.log(data, "DATA FETCHED")
                return data
                
                
            }  catch (err) {
                setIsLoading(false);
                setIsValid(false);
                if (err.message.startsWith(`TypeError`) ) {
                    setError('Something Went Wrong Or To many request from your IP adress')
                } else {
                setError(`${err ? err : "Something went wrong. Try again later!"}`)
                }
                console.log("HERE IN CATCH BLOCK", err)
            }
        }, [])


       
        return {sendRequest, isLoading, isValid, setError, error, setIsValid}
}