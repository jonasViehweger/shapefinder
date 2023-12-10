import React, { useState, ChangeEvent, FormEvent } from "react";

interface Border {
  adm: string;
  id: string;
}

const initialValues: Border = {
  adm: "",
  id: "",
};

const appOrigin = "*"; //"https://d8qn3zfqpd0bq.cloudfront.net"

const App: React.FC = () => {
  const [values, setValues] = useState<Border>(initialValues);
  const [result, setResult] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    try {
      const response = await fetch(`https://uqsso1c777.execute-api.eu-central-1.amazonaws.com/Prod/${values.adm}/${values.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": appOrigin,
        }
      });

      if (response.ok) {
        const responseBody = await response.json();
        console.log(responseBody)
        const message = JSON.stringify(responseBody); // Assuming the message is part of the response body
  
        if (message) {
          setResult(message); // Set the result to the message received from the API
        } else {
          setResult("No message received from the API");
        }
      } else {
        setResult("Something went wrong!");
      }
    } catch (error) {
      setResult("Something went wrong!");
      console.error(error);
    }
  };

  return (
    <div className="App">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Adm:</label><br />
        <input type="text" name="adm" value={values.adm} onChange={(e) => handleInputChange(e)} id="adm" /><br /><br />

        <label>Id:</label><br />
        <input type="text" name="id" value={values.id} onChange={(e) => handleInputChange(e)} id="id" /><br /><br />

        <input type="submit" id="submit-button" />
      </form>

      <p>{result}</p>
    </div>
  );
};

export default App;