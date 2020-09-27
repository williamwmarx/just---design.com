/* Import React */
import React from "react"

/* Import Components */
import Card from "../components/Card.js"
import CardStack from "../components/CardStack.js"
import Emoji from "../components/Emoji.js"
import Link from "../components/Link.js"
import Page from "../components/Page.js"
import Sheets from "../components/Sheets.js"

/* Import Styles */
import "../sass/main.sass";

/* Import Data */
import BIPOCStudiosDataSparse from "../../static/json/BIPOCStudiosDataSparse.json"

/* Import Content */
import BlackOwned from "../../static/images/black_owned.png"
import IndigenousOwned from "../../static/images/indigenous_owned.png"
import NonBinaryOwned from "../../static/images/non_binary_owned.png"
import WomenOwned from "../../static/images/women_owned.png"

// Define images for use in bipoc_studios_header and bipoc_studios_cards
let images = {
  "Black Owned": <img src={BlackOwned} alt="Black Owned" height="16em"/>,
  "Indigenous Owned": <img src={BlackOwned} alt="Indigenous Owned" height="16em"/>,
  "Non-Binary Owned": <img src={NonBinaryOwned} alt="Non-Binary Owned" height="16em"/>,
  "Women Owned": <img src={WomenOwned} alt="Women Owned" height="16em"/>,
  "Hiring": <Emoji>🛠</Emoji>,
  "Looking for Collaborators": <Emoji>🔎</Emoji>
}

// MAIN RENDER
export default class BIPOCStudios extends React.Component {
  constructor(props) {
    super(props);
    this.cardstackRef = React.createRef();
    this.handleSortChange = this.handleSortChange.bind(this);
    this.state = {
      category: "All",
      search_query: "",
      studios: BIPOCStudiosDataSparse["studios"]
    };
  }

  handleSortChange(event) {
    this.cardstackRef.current.update_cards_dims();
    this.setState({[event.target.name]: event.target.value});
    if (event.target.name === "search_query") this.setState({category: "All"})
  }

  componentDidMount() {
    Sheets.getData("1xqRHOQ4vz7bBP5e9YePT0bLaqPTBCNKm-xUglQf1eVo", 2, 11).then(sheet_data => {
      this.setState({
        studios: sheet_data,
      });
    });
  }

  render() {
    let categories = ["All", "Black Owned", "Indigenous Owned", "Non-Binary Owned", "Women Owned", "Hiring", "Looking for Collaborators"];
    let people = [["Virgil Abloh", "virgilabloh"], ["Hassan Rahim", "hassanrahim"], ["Mahfuz Sultan", "mahfuzsultan"],
                  ["Naïla Opiangah", "bouenguidi"], ["Dom Leong", "leong_dominic"], ["Esther Choi", "estherchoi"], 
                  ["Preeti Sriratana", "theofficialpreeti"], ["Aimee Chang", "_aimeechang_"], ["Tei Carpenter", "teicarpenter"], 
                  ["Joey Swerdlin", "swerdlin"], ["Oana Stănescu", "oooooana"], ["Dong-Ping Wong", "dongpingwong"]]

    return (
      <Page typename="card" title="BIPOC Studios.">        
        <h3>Mission</h3>
        <p>
          This is an ongoing list of BIPOC architecture, engineering, landscape, graphic design, industrial design and planning studios worldwide, some which are hiring, many many of which are Black owned. 

          This resource was created by {people.slice(0, -1).map((person, idx) => {
            return <span key={`person_${idx}`}><Link href={`https://instagram.com/${person[1]}/`}>{person[0]}</Link>,&nbsp;</span>
          })}
          <Link href={`https://instagram.com/${people[people.length - 1][1]}/`}>{people[people.length - 1][0]}</Link>.
        </p>

        <h3>Submit</h3>
        <p><Link href="https://forms.gle/NtkbkJQTGLwfAMHE8">Add a Studio</Link> <Emoji>➕</Emoji></p>
        <br/>
        
        <h3>Additional Links</h3>
        <p>
          <Link href="https://docs.google.com/document/d/1UWSyLpd_c6-eLUh_QCpyC8kFz0sKxOmco-AzuiUtQXk/edit">PPP Loan Info</Link> <Emoji>💸</Emoji><br/> <span className="arrow">→</span>
          <Link href="mailto:bipocstudios@gmail.com">Suggest an Edit to the Site</Link> <Emoji>📨</Emoji> <span className="arrow">→</span>
        </p>

        <h3>Key</h3>
        {Object.keys(images).map((key, idx) => {
          return <p key={`key_${idx}`}>{images[key]} {key}</p>
        })}

        <h3>Filter Results</h3>
        <div className="menu">
          <select name="category" value={this.state.category} onChange={this.handleSortChange}>
            {categories.sort().map((category, idx) => {
              return <option key={`option_${idx}`} value={category}>{category}</option> 
            })}
          </select>
        </div>

        <input name="search_query" onChange={this.handleSortChange} className="search" type="text" placeholder="Search..."/>

        <CardStack ref={this.cardstackRef}>
          {this.state.studios.map((studio_data, card_num) => {
            let studio = {
              "name": studio_data[0],
              "black_owned": (studio_data[1] === "B"),
              "indigenous_owned": (studio_data[1] === "I"),
              "women_owned": (studio_data[2] === "W"),
              "nonbinary_owned": (studio_data[2] === "NB"),
              "location": studio_data[3],
              "typename": studio_data[4],
              "instagram": studio_data[5]?.slice(1),
              "website": studio_data[6],
              "hiring": (studio_data[7] === "Yes"),
              "hiring_positions": studio_data[8],
              "looking_for_collaborators": studio_data[8]?.toLowerCase().includes("collab"),
              "contact_name": (!studio_data[9]) ? studio_data[10] : studio_data[9],
              "contact_email": studio_data[10]
            }

            let categories = []
            if (studio["black_owned"]) categories.push("Black Owned")
            if (studio["indigenous_owned"]) categories.push("Indigenous Owned")
            if (studio["women_owned"]) categories.push("Women Owned")
            if (studio["nonbinary_owned"]) categories.push("Non-Binary Owned")
            if (studio["hiring"]) categories.push("Hiring")
            if (studio["looking_for_collaborators"]) categories.push("Looking for Collaborators")

            // Search Query String
            let search_string = [studio["name"], studio["location"], studio["typename"], studio["instagram"], studio["website"], studio["hiring_positions"], studio["contact_name"]].join().toLowerCase()

            let emoji_html = (
              <span>
                {categories.map((category, idx) => {
                  return <span key={`category_${idx}`}>{images[category]}</span>
                })}
              </span>
            );

            let contact_link = null
            if (studio["contact_email"]?.includes("@")) contact_link = (
              <Card.Button href={`mailto:${studio["contact_email"]}?body=${studio["contact_name"]} —`}>{studio["contact_name"]} <Emoji>📨</Emoji></Card.Button>
            )
            else if (studio["contact_email"]) contact_link = <Card.Button href={studio["contact_email"]}> studio["contact_name"] <Emoji>🌐</Emoji></Card.Button>

            let hiring_positions = null
            if ((studio["hiring"] || studio["looking_for_collaborators"]) && studio["hiring_positions"]) {
              hiring_positions = (
                <p>
                  {studio["hiring"] && <span>{images["Hiring"]}</span>}
                  {studio["looking_for_collaborators"] && <span>{images["Looking for Collaborators"]}</span>}
                  {studio["hiring_positions"]}
                </p>
              )
            }
           
            if (
              (this.state.search_query === "" || search_string.includes(this.state.search_query.toLowerCase()))
              && (this.state.category === "All" || categories.includes(this.state.category))
            ) {
              return (
                <Card key={`card_${card_num}`}>
                  <Card.Header>
                    <Card.Tags>{emoji_html}</Card.Tags>
                    <Card.Title>{studio["name"]}</Card.Title>
                    {studio["typename"] && <Card.Subtitle>{studio["typename"]}</Card.Subtitle>}
                    {studio["location"] && <Card.Subtitle2>{studio["location"]}</Card.Subtitle2>}
                  </Card.Header>
                  <Card.Body>
                    {hiring_positions}
                    {studio["instagram"] && <Card.Button href={`https://instagram.com/${studio["instagram"]}`}>{`@${studio["instagram"]}`} <Emoji>📸</Emoji></Card.Button>}<br/>
                    {contact_link}<br/>
                    {studio["website"] && <Card.Button href={studio["website"]}>Go to website <Emoji>🌐</Emoji></Card.Button>}
                  </Card.Body>
                </Card>
              );
            }
          })}
        </CardStack>
      </Page>
    );
  }
}
