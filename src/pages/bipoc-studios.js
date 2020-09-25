/* Import React */
import React from "react";
/* Import Components */
import Card from "../components/Card.js";
import CardContent from "../components/CardContent.js";
import CardStack from "../components/CardStack.js";
import Emoji from "../components/Emoji.js"
import Link from "../components/Link.js"
/* Import Styles */
import "../sass/main.sass";
/* Import Data */
import BIPOCStudiosSparse from "../../static/json/BIPOCStudiosSparse.json"
/* Import Content */
import BlackOwned from "../../static/images/black_owned.png"
import IndigenousOwned from "../../static/images/indigenous_owned.png"
import NonBinaryOwned from "../../static/images/non_binary_owned.png"
import WomenOwned from "../../static/images/women_owned.png"

// Define images for use in bipoc_studios_header and bipoc_studios_cards
let BlackOwnedImage = <img src={BlackOwned} alt="Black Owned" height="16em"/>
let IndigenousOwnedImage = <img src={IndigenousOwned} alt="Indigenous Owned" height="16em"/>
let NonBinaryOwnedImage = <img src={NonBinaryOwned} alt="Non-Binary Owned" height="16em"/>
let WomenOwnedImage = <img src={WomenOwned} alt="Women Owned" height="16em"/>
let HiringEmoji = <Emoji emoji="🛠" name="hammer and wrench"/>
let CollabEmoji = <Emoji emoji="🔎" name="magnifying glass tilted right"/>

// MAIN RENDER
export default class BIPOCStudios extends React.Component {
   constructor(props) {
    super(props);
    this.cardstackRef = React.createRef();
    this.handleSortChange = this.handleSortChange.bind(this);
    this.state = {
      category: "All",
      search_query: "",
      studios: BIPOCStudiosSparse["studios"]
    };
  }

  handleSortChange(event) {
    this.cardstackRef.current.update_cards_dims();
    this.setState({[event.target.name]: event.target.value});
    if (event.target.name === "search_query") this.setState({category: "All"})
  }

  componentDidMount() {
    const that = this;
    fetch("https://spreadsheets.google.com/feeds/cells/1xqRHOQ4vz7bBP5e9YePT0bLaqPTBCNKm-xUglQf1eVo/2/public/full?alt=json")
    .then(function(response) {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: '+response.status);
            return;
        } else return response.json();
      }
    ).then(function(data) {
      let studio_list = [];
      let entries = data["feed"]["entry"];
      for (var i = 0; i < entries.length; i += 11) {
        let studio_name = entries[i]["content"]["$t"];
        let black_or_indigenous_owned = entries[i+1]["content"]["$t"];
        let women_or_nonbinary_owned = entries[i+2]["content"]["$t"];
        let studio_location = entries[i+3]["content"]["$t"];
        let type_of_work = entries[i+4]["content"]["$t"];
        let instagram = entries[i+5]["content"]["$t"];
        let website = entries[i+6]["content"]["$t"];
        let hiring = entries[i+7]["content"]["$t"];
        let hiring_positions = entries[i+8]["content"]["$t"];
        let contact_names = entries[i+9]["content"]["$t"];
        let contact_email = entries[i+10]["content"]["$t"];
        if (studio_name !== "") studio_list.push([studio_name, black_or_indigenous_owned, women_or_nonbinary_owned, studio_location, type_of_work, instagram, website, hiring, hiring_positions, contact_names, contact_email])
      }
      console.log(studio_list)
      that.setState({studios: studio_list})
    })
    .catch(function(err) {
        console.log('Fetch Error: ', err);
    });
  }

  render() {
    let categories = ["All", "Black Owned", "Indigenous Owned", "Non-Binary Owned", "Women Owned", "Hiring", "Looking for Collaborators"];

    return (
      <CardContent>        
        <div>
          <h1>BIPOC Studios</h1>
          <CardContent.Header>Mission</CardContent.Header>
            <CardContent.Text>
              This is an ongoing list of BIPOC architecture, engineering, landscape, graphic design, industrial design and planning studios worldwide, some which are hiring, many many of which are Black owned. 

              This resource was created by&nbsp; 
                <Link href={`https://instagram.com/virgilabloh/`}>Virgil Abloh</Link>,&nbsp;
                <Link href={`https://instagram.com/hassanrahim/`}>Hassan Rahim</Link>,&nbsp;
                <Link href={`https://instagram.com/mahfuzsultan/`}>Mahfuz Sultan</Link>,&nbsp;
                <Link href={`https://instagram.com/bouenguidi/`}>Naïla Opiangah</Link>,&nbsp;
                <Link href={`https://instagram.com/leong_dominic/`}>Dom Leong</Link>,&nbsp;
                <Link href={`https://instagram.com/esthermchoi/`}>Esther Choi</Link>,&nbsp;
                <Link href={`https://instagram.com/theofficialpreeti/`}>Preeti Sriratana</Link>,&nbsp;
                <Link href={`https://instagram.com/_aimeechang_/`}>Aimee Chang</Link>,&nbsp;
                <Link href={`https://instagram.com/teicarpenter/`}>Tei Carpenter</Link>,&nbsp;
                <Link href={`https://instagram.com/swerdlin/`}>Joey Swerdlin</Link>,&nbsp;
                <Link href={`https://instagram.com/oooooana/`}>Oana Stănescu</Link>,&nbsp;
                <Link href={`https://instagram.com/dongpingwong/`}>Dong-Ping Wong</Link>.
            </CardContent.Text>
          <br/>
          <CardContent.Header>Submit</CardContent.Header>
            <CardContent.Text>
              <Link href="https://forms.gle/NtkbkJQTGLwfAMHE8">Add a Studio</Link> <Emoji emoji="➕" name="addition sign"/>
            </CardContent.Text>
          <br/>
          
      <CardContent.Header>Additional Links</CardContent.Header>
            <CardContent.Text>
              <Link href="https://docs.google.com/document/d/1UWSyLpd_c6-eLUh_QCpyC8kFz0sKxOmco-AzuiUtQXk/edit">PPP Loan Info</Link> <Emoji emoji="💸" name="money with wings"/><br/>
                <Link href="mailto:bipocstudios@gmail.com">Suggest an Edit to the Site</Link> <Emoji emoji="📨" name="incoming mail"/>
            </CardContent.Text>
          <br/>

          <CardContent.Header>Key</CardContent.Header>
            <CardContent.Text>{BlackOwnedImage}&nbsp;&nbsp;Black Owned</CardContent.Text>
            <CardContent.Text>{IndigenousOwnedImage}&nbsp;&nbsp;Indigenous Owned</CardContent.Text>
            <CardContent.Text>{NonBinaryOwnedImage}&nbsp;&nbsp;Non-Binary Owned</CardContent.Text>
            <CardContent.Text>{WomenOwnedImage}&nbsp;&nbsp;Women Owned</CardContent.Text>
            <CardContent.Text>{HiringEmoji}&nbsp;&nbsp;Hiring</CardContent.Text>
            <CardContent.Text>{CollabEmoji}&nbsp;&nbsp;Looking for Collaborators</CardContent.Text>
            <br/>

          <CardContent.Header>Filter Results</CardContent.Header>
          <div className="menu">
            <select name="category" value={this.state.category} onChange={this.handleSortChange}>
              {categories.sort().map((category, source_index) => {
                return <option  key={`content_item_${source_index}`} value={category}>{category}</option> 
              })}
            </select>
          </div>
          <input name="search_query" onChange={this.handleSortChange} className="search" type="text" placeholder="Search..."/>

          <br/>
          <CardStack ref={this.cardstackRef}>
            {this.state.studios.map((data, index) => {
              // Studio Name
              let studio_name = data[0];
              // Black or Indigenous Owned
              let black_or_indigenous_owned = data[1]
              let black_owned = false
              if (black_or_indigenous_owned === "B") black_owned = true
              let indigenous_owned = false
              if (black_or_indigenous_owned === "I") indigenous_owned = true
              // Women or Non-Binary Owned
              let women_or_nonbinary_owned = data[2]
              let women_owned = false
              if (women_or_nonbinary_owned === "W") women_owned = true
              let nonbinary_owned = false
              if (women_or_nonbinary_owned === "NB") nonbinary_owned = true
              // Location
              let studio_location = data[3]
              if (studio_location === "N/A") studio_location = null
              // Type of work
              let type_of_work = data[4]
              if (type_of_work === "N/A") type_of_work = null
              // Instagram
              let instagram = data[5].slice(1)
              if (instagram === "N/A") instagram = []
              else instagram = [instagram]
              // Website
              let website = data[6]
              if (website === "N/A") website = null
              // Hiring
              let hiring_string = data[7]
              let hiring = false
              if (hiring_string === "Yes") hiring = true
              let hiring_positions = data[8]
              let looking_for_collaborators = false
              if (hiring_positions === "N/A") hiring_positions = null
              else if (hiring_positions.toLowerCase().includes("collab")) looking_for_collaborators = true
              // Contact
              let contact_name = data[9]
              if (contact_name === "N/A") contact_name = null
              let contact_email = data[10]
              if (contact_email === "N/A") contact_email = null

              // Categories
              let category = [];
              if (black_owned) category.push("Black Owned")
              if (indigenous_owned) category.push("Indigenous Owned")
              if (women_owned) category.push("Women Owned")
              if (nonbinary_owned) category.push("Non-Binary Owned")
              if (hiring) category.push("Hiring")
              if (looking_for_collaborators) category.push("Looking for Collaborators")

              // Search Query String
              let search_string = [studio_name, studio_location, type_of_work, instagram, website, hiring_positions, contact_name].join().toLowerCase()

              let emoji_html = (
                <span>
                  {black_owned && <span>{BlackOwnedImage}&nbsp;&nbsp;</span>}
                  {indigenous_owned && <span>{IndigenousOwnedImage}&nbsp;&nbsp;</span>}
                  {nonbinary_owned && <span>{NonBinaryOwnedImage}&nbsp;&nbsp;</span>}
                  {women_owned && <span>{WomenOwnedImage}&nbsp;&nbsp;</span>}
                  {hiring && <span><Emoji emoji="🛠" name="hammer and wrench"/>&nbsp;</span>}
                  {looking_for_collaborators && <span>{CollabEmoji}&nbsp;</span>}
                </span>
              );

              let link = null
              if (contact_email !== null) {
                if (contact_name === null) contact_name = studio_name
                let url = contact_email
                if (url.includes("@")) link = <Card.Link href={`mailto:${url}?body=${contact_name} —`} text={contact_name} emoji_name="incoming envelope" emoji="📨"/>
                else link = <Card.Link href={url} text={contact_name} emoji_name="globe with meridians" emoji="🌐"/>
              }

              if ((hiring || looking_for_collaborators) && hiring_positions) {
                hiring_positions = (
                  <Card.Text>
                    {hiring && <span>{HiringEmoji}&nbsp;</span>}
                    {looking_for_collaborators && <span>{CollabEmoji}&nbsp;</span>}
                    {hiring_positions}
                  </Card.Text>
                )
              }
             
              if (
                (this.state.search_query === "" || search_string.includes(this.state.search_query.toLowerCase())) 
                && (this.state.category === "All" || category.includes(this.state.category))
              ) {
                return (
                  <Card key={`card_${index}`}>
                    <Card.Header>
                      <Card.Tags>{emoji_html}</Card.Tags>
                      <Card.Title>{studio_name}</Card.Title>
                      {type_of_work !== [] && <Card.Subtitle>{type_of_work}</Card.Subtitle>}
                      {studio_location !== [] && <Card.Subtitle2>{studio_location}</Card.Subtitle2>}
                    </Card.Header>
                    <Card.Body>
                      {hiring_positions}
                      {instagram && instagram.map((ig, ig_index) => {
                        return <Card.Link key={`instagram_${ig_index}`} href={`https://instagram.com/${ig}`} text={`@${ig}`} emoji="📸" emoji_name="camera with flash"/>
                      })}
                      {link}
                      {website && <Card.Link href={website} text="Go to website" emoji="🌐" emoji_name="globe with meridians"/>}
                    </Card.Body>
                  </Card>
                );
              }
            })}
          </CardStack>
        </div>
      </CardContent>
    );
  }
}
