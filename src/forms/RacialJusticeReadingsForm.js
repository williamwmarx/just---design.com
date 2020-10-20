/* Import  React */
import React from "react"
import axios from "axios"

/* Style Sheet */
import "../sass/main.scss"

/* Google Form Constants */
const GOOGLE_FORM_TITLE_ID = "entry.229421105"
const GOOGLE_FORM_SOURCE_LINK_ID = "entry.629622513"
const GOOGLE_FORM_AUTHORS_ID = "entry.1649634702"
const GOOGLE_FORM_AUTHORS_LINKS_ID = "entry.2134907068"
const GOOGLE_FORM_SUMMARY_ID = "entry.386650847"
const GOOGLE_FORM_SUMMARY_SOURCE_ID = "entry.464986890"
const GOOGLE_FORM_SUMMARY_SOURCE_LINK_ID = "entry.629622513"
const GOOGLE_FORM_TAKEN_FROM_ID = "entry.279440403"
const GOOGLE_FORM_TAKEN_FROM_LINK_ID = "entry.514729131"
const GOOGLE_FORM_TAG_ID = "entry.901375189"
const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfFuW27ZCISbeKDzNsQSi0EPsSh6uwlzsUXqkRf4c1AYVwy9A/formResponse"
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'

export default class GlossaryForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      sourceLink: "",
      authors: "",
      authorsLinks: "",
      summary: "",
      summarySource: "",
      summarySourceLink: "",
      takenFrom: "",
      takenFromLink: "",
      tag: "",
      other: "Other",
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
    formData.append(GOOGLE_FORM_TITLE_ID, this.state.title) 
    formData.append(GOOGLE_FORM_SOURCE_LINK_ID, this.state.sourceLink)
    formData.append(GOOGLE_FORM_AUTHORS_ID, this.state.authors)
    formData.append(GOOGLE_FORM_AUTHORS_LINKS_ID, this.state.authorsLinks)
    formData.append(GOOGLE_FORM_SUMMARY_ID, this.state.summary)
    formData.append(GOOGLE_FORM_SUMMARY_SOURCE_ID, this.state.summarySource)
    formData.append(GOOGLE_FORM_SUMMARY_SOURCE_LINK_ID, this.state.summarySourceLink)
    formData.append(GOOGLE_FORM_TAKEN_FROM_ID, this.state.takenFrom)
    formData.append(GOOGLE_FORM_TAKEN_FROM_LINK_ID, this.state.takenFromLink)
    formData.append(GOOGLE_FORM_TAG_ID, this.state.tag)

    // POST DATA
    axios.post(CORS_PROXY + GOOGLE_FORM_ACTION_URL, formData)
    .then(() => {
      this.setState({
        formSubmitted: true,
        formSubmitting: false,
        title: "",
        sourceLink: "",
        authors: "",
        authorsLinks: "",
        summary: "",
        summarySource: "",
        summarySourceLink: "",
        takenFrom: "",
        takenFromLink: "",
        tag: ""
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

    let tags = ["Decoloniality + Decolonization", "Race, Racism and Racial Capitalism", "Subaltern Studies", "Empire", "Protest", "Conservation", "Vocabulary", "Reflections on the Present", "Prison Industrial Complex", "Pedagogy and Resistance"]

    return (
      <form onSubmit={this.handleSubmit}>
        {/* TITLE */}
        <section>
          <input
            type="text" onChange={this.handleChange}
            name="title"
            value={this.state.title}
            placeholder="Title"
            aria-label="Title"
            required
          />
        </section>

        {/* SOURCE LINK */}
        <section>
          <input 
            type="url"
            onChange={this.handleChange}
            name="reading link"
            value={this.state.sourceLink} 
            placeholder="Link to Text"
            aria-label="Link to Text"
            required
          />
        </section>

        {/* AUTHOR(S) */}
        <section>
          <input
            type="text" onChange={this.handleChange}
            name="author"
            value={this.state.authors}
            placeholder="Author"
            aria-label="Author"
            required
          />
        </section>

        {/* AUTHOR(S) LINK(S) */}
        <section>
          <input 
            type="url"
            onChange={this.handleChange}
            name="author link"
            value={this.state.sourceLink} 
            placeholder="Author Link"
            aria-label="Author Link"
            required
          />
        </section>

        {/* SUMMARY */}
        <section>
          <textarea 
            type="text"
            onChange={this.handleChange}
            name="summary"
            value={this.state.summary}
            rows="4"
            placeholder="Summary"
            aria-label="Summary"
            required
          />
        </section>

        {/* SUMMARY SOURCE */}
        <section>
          <input
            type="text" onChange={this.handleChange}
            name="summary source"
            value={this.state.summarySource}
            placeholder="Summary Souce"
            aria-label="Summary Source"
            required
          />
        </section>

        {/* SUMMARY SOURCE LINK */}
        <section>
          <input 
            type="url"
            onChange={this.handleChange}
            name="summary source link"
            value={this.state.summarySourceLink} 
            placeholder="Summary Source Link"
            aria-label="Summary Source Link"
            required
          />
        </section>

        {/* TAKEN FROM */}
        <section>
          <input
            type="text" onChange={this.handleChange}
            name="taken from"
            value={this.state.takenFrom}
            placeholder="Taken From"
            aria-label="Taken From"
            required
          />
        </section>

        {/* TAKEN FROM LINK */}
        <section>
          <input 
            type="url"
            onChange={this.handleChange}
            name="taken from link"
            value={this.state.takenFromLink} 
            placeholder="Taken From Link"
            aria-label="Taken From Link"
            required
          />
        </section>

        <section className="radio">
          <p>Tag</p>
          {tags.sort().map((tag, i) =>
            <div>
              <input
                type="radio"
                id={tag.toLowerCase()}
                name="tag"
                value={this.state.tag}
                {...(i === 0) && "checked"}
                required
              />
              <label for={tag.toLowerCase()}>{tag}</label>
            </div>
          )}
          <div>
            <input
              type="radio"
              id="other"
              name="tag"
              value={this.state.other}
            />
            <input 
              type="text"
              onChange={this.handleChange}
              id="other-text"
              for="other"
              name="other"
              value={this.state.other} 
              placeholder="Other"
              aria-label="Other"
              required
            />
          </div>
        </section>

        <button type='submit'>
          {buttonMessage}
        </button>
      </form>
    )
  }
}
