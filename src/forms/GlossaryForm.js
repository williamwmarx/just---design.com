/* Import  React */
import React from "react"
import axios from "axios"

/* Style Sheet */
import "../sass/main.scss"

/* Google Form Constants */
const GOOGLE_FORM_SUBJECT_ID = "entry.1042180808"
const GOOGLE_FORM_TERM_ID = "entry.1985962818"
const GOOGLE_FORM_DEFINITION_ID = "entry.745983178"
const GOOGLE_FORM_SOURCE_ID = "entry.572532369"
const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSeOiGTyZIEQbBf0OmAuB6WMJrYUAfd5t3wif3MtIlf8FG6VWA/formResponse"
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'

export default class GlossaryForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      subject: "General",
      term: "",
      definition: "",
      source: "",
      formSubmitting: false,
      formSubmitted: false,
      submissionError: false,
      buttonReset: false
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({
      formSubmitting: true,
      buttonReset: false
    })
    this.sendMessage() 

    setTimeout(function() {
      this.setState({
        buttonReset: true
      })
    }.bind(this), 3000)
  }

  sendMessage = () => {
    // ADD FORM DATA 
    const formData = new FormData()
    formData.append(GOOGLE_FORM_SUBJECT_ID, this.state.subject)
    formData.append(GOOGLE_FORM_TERM_ID, this.state.term)
    formData.append(GOOGLE_FORM_DEFINITION_ID, this.state.definition)
    formData.append(GOOGLE_FORM_SOURCE_ID, this.state.source)

    // POST DATA
    axios.post(CORS_PROXY + GOOGLE_FORM_ACTION_URL, formData)
    .then(() => {
      this.setState({
        formSubmitted: true,
        formSubmitting: false,
        subject: "",
        term: "",
        definition: "",
        source: ""
      })
    }).catch(() => {
      this.setState({
        submissionError: true,
        formSubmitting: false
      })
    })
  }

  render() {
    let buttonMessage = <span>Submit <span className="arrow">→</span></span>
    if (!this.state.buttonReset) {
      if (this.state.formSubmitting) buttonMessage = "Submitting...."
      else if (this.state.formSubmitted) buttonMessage = "Submitted!"
      else if (this.state.submissionError) buttonMessage = "Error :/"
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <section className="radio">
          <p>Subject</p>
          <input
            type="radio"
            id="general"
            name="subject"
            value={this.state.subject}
            checked
            required
          />
          <label for="general">General</label>
          <br/>

          <input
            type="radio"
            id="racial-justice"
            name="subject"
            value={this.state.subject}
          />
          <label for="racial-justice">Racial Justice</label>
        </section>

        <section>
          <input
            type="text"
            onChange={this.handleChange}
            name="term"
            value={this.state.term}
            placeholder="Term"
            aria-label="Term"
            required
          />
        </section>

        <section>
          <textarea 
            type="text"
            onChange={this.handleChange}
            name="definition"
            value={this.state.definition}
            placeholder="Definition"
            aria-label="Definition"
            required
          />
        </section>

        <section>
          <input 
            type="url"
            onChange={this.handleChange}
            name="source"
            value={this.state.source} 
            placeholder="Source URL"
            aria-label="Source"
            required
          />
        </section>

        <button type='submit'>
          {buttonMessage}
        </button>
      </form>
    )
  }
}
