import React from 'react'
import { useState } from 'react'
import axios from 'axios'


export default function TextForm(props) {
  const [text, setText] = useState('');
    const [correctedText, setCorrectedText] = useState('');
    const [loading, setLoading] = useState(false);

const correctGrammar = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are a grammar correction assistant."
            },
            {
              role: "user",
              content: `Correct the grammar of this sentence: ${text}`
            }
          ],
          temperature: 0
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer YOUR_API_KEY`
          }
        }
      );

      setCorrectedText(response.data.choices[0].message.content);
    } catch (error) {
      console.error("Error correcting grammar:", error);
    }
    setLoading(false);
  };

  const handleUppercase = () => {
    setText(text.toUpperCase());
  };

  const handleLowercase = () => {
    setText(text.toLowerCase());
  };
  const handleOnChange = (event) => {
    setText(event.target.value);
  }

  return (
<>

<div className="Container mb-3">
    <h1>{props.heading} </h1>
  <textarea class="form-control" id="myBox" rows="8" value={text} onChange={handleOnChange}></textarea>
</div>
<button className="btn btn-primary" onClick={handleUppercase}>Convert to Uppercase</button>
<button className="btn btn-primary mx-2" onClick={handleLowercase}>Convert to Lowercase</button>
<button className="btn btn-primary mx-2" onClick={correctGrammar} disabled={loading}>{loading ? 'Correcting...' : 'Correct Grammar'}</button>
<div className="container my-3">
    <h2>Your text summary</h2>
    <p>{text.split(" ").length} words and {text.length} characters</p>
    <p>{0.008 * text.split(" ").length} Minutes read</p>
    <h3>Preview</h3>
    <p>{text.length > 0 ? text : "Enter something in the textbox above to preview it here"}</p>
    {correctedText && (
      <div>
        <h3>Corrected Grammar</h3>
        <p>{correctedText}</p>
      </div>
    )}
    </div>
</>
  )
}
