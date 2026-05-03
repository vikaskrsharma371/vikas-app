import React, { useState } from 'react'
import axios from 'axios'

export default function TextForm(props) {
  const [text, setText] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [duplicates, setDuplicates] = useState([]);

  const correctGrammar = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a grammar correction assistant.',
            },
            {
              role: 'user',
              content: `Correct the grammar of this sentence: ${text}`,
            },
          ],
          temperature: 0,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer YOUR_API_KEY`,
          },
        }
      )

      setCorrectedText(response.data.choices[0].message.content)
    } catch (error) {
      console.error('Error correcting grammar:', error)
    }
    setLoading(false)
  }

  const findDuplicates = () => {
    const words = text.toLowerCase().match(/\b\w+\b/g) || []
    const countMap = {}

    words.forEach((word) => {
      countMap[word] = (countMap[word] || 0) + 1
    })

    const result = Object.keys(countMap)
      .filter((word) => countMap[word] > 1)
      .map((word) => ({
        word,
        count: countMap[word],
      }))

    setDuplicates(result)
  }


  const handleClear = () => {
    setText(""); // clears text
  }

  const handleUppercase = () => {
    setText(text.toUpperCase())
    props.showAlert("Converted to uppercase!", "success")
  }

  const handleLowercase = () => {
    setText(text.toLowerCase())
    props.showAlert("Converted to lowercase!", "success")
  }

  const handleOnChange = (event) => {
    setText(event.target.value)
  }

  return (
    <>
      <div className="Container mb-3" style={ {color: props.mode === 'dark' ? 'white' : 'black'},{color: props.mode === 'dark' ? 'white' : 'black'} }>
        <h1>{props.heading}  </h1>
        <textarea
          className="form-control"
          id="myBox"
          rows="8"
          value={text} style={{ background: props.mode === 'dark' ? 'grey' : 'white' }}
          onChange={handleOnChange}
        ></textarea>
      </div>

      <button className="btn btn-primary" onClick={handleUppercase}>
        <i className="fas fa-arrow-up"></i> Convert to Uppercase
      </button>
      <button className="btn btn-primary mx-2" onClick={handleLowercase}>
        <i className="fas fa-arrow-down"></i> Convert to Lowercase
      </button>
      <button
        className="btn btn-primary mx-2"
        onClick={correctGrammar}
        disabled={loading}
      >
        <i className="fas fa-spell-check"></i> {loading ? 'Correcting...' : 'Correct Grammar'}
      </button>

      <button className="btn btn-secondary mx-2" onClick={findDuplicates}>
        <i className="fas fa-search"></i> Find Duplicates
      </button>
     <button className="btn btn-secondary mx-2" onClick={handleClear}>
        Clear Text
      </button>

      <div className="container my-3"  style={ {color: props.mode === 'dark' ? 'white' : 'black'},{color: props.mode === 'dark' ? 'white' : 'black'} }>
        <h2>Your text summary</h2>
        <p>
          {text.split(' ').filter(word => word !== '').length} words and {text.length} characters
        </p>
        <p>{0.008 * text.split(' ').length} Minutes read</p>

        <h3>Preview</h3>
        <p>
          {text.length > 0
            ? text
            : 'Enter something in the textbox above to preview it here'}
        </p>

        {correctedText && (
          <div>
            <h3>Corrected Grammar</h3>
            <p>{correctedText}</p>
          </div>
        )}

        <h3>Duplicates:</h3>
        <ul>
          {duplicates.map((item, index) => (
            <li key={index}>
              {item.word} → {item.count} times
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
