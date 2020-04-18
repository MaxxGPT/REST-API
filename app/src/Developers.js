import React, { Component } from "react";
import Sidebar from './components/Sidebar' 



class Developer extends Component {
    render() {
        return(
            <div style={{display: "flex" }}>
                <Sidebar />
                <h1> API Documentation </h1>

                    <h3>API Reference</h3>

                            <p>The AsaTera API is organized around <a href="https://en.wikipedia.org/wiki/Representational_state_transfer">REST</a>. Our API has predictable resource-oriented URLs, accepts form-encoded request bodies, returns <a href="https://www.json.org/json-en.html">JSON-encoded</a> responses, and uses standard HTTP response codes.
                            By default, the Stripe API Docs demonstrate using curl to interact with the API over HTTP. Select one of our official client libraries to see examples in code.</p>

                            <p>Was this section helpful? Yes No</p>

                            <h3>Authentication</h3>

                            <p>The AsaTera API uses API keys to authenticate requests. You can view and manage your API keys in the <a href="http://localhost/Dashboard">User Dashboard</a>.</p>

                            <p>Your API key carries many privileges, so be sure to keep them secure! Do not share your key in publicly accessible areas such as GitHub, client-side code, and so forth.</p>

                            <p>Authentication to the API is performed via HTTP Basic Auth. Provide your API key as the basic auth value. You do not need to provide a password.</p>

                            <p>API request must be made over HTTPS. Calls made over plan HTTP will fail. API request without authentication will also fail.</p>

                            <p>Was this section helpful? Yes No</p>


                            <h3>Errors</h3>

                            <p>AsaTera uses conventional HTTP response codes to indicate the success or failure of an API request. In general: Codes in the 2xx range indicate success. Codes in the 4xx range indicate an error that failed given the information provided (e.g., a required parameter was omitted, etc.) Codes in the 5xx range indicate an error with AsaTera’s servers (there are rare).</p>

                            <p>Was this section helpful? Yes No</p>

                            <p>Handling Errors</p>

                            <p>Our Client libraries raise exceptions for many reasons, such as invalid parameters, authentication errors, and network unavailability. We recommend writing code that gracefully handles all possible API exceptions.</p>


                            <h3>Endpoints</h3>

                            <p>AsaTera API has 2 main endpoints:</p>

                            <p>Articles. /articles – returns all articles. Information displayed are title, author, date published, content, summarization of content, URL to image, metadata, to include named entities, location, categories, and more). We index every recent news and blog article published by over 10,000 different sources large and small. You can search through them with this endpoint. This endpoint is best suited for news analysis and article discovery, but can be used to retrieve articles for display too.</p>

                            <p>Sources. /sources – returns information including name, description, location, and url) about the sources we index. This list could be piped directly through to your users when showing them what options are available.</p> 

                            <h3>Client Libraries</h3>

                            <p>AsaTera has official libraries for different programming languages. Use a client library to quickly and easily get started with AsaTera API without worrying about the underlying setup.</p> 

                            <p>We have libraries for the following languages:</p>

                            <ul>
                                <li>Node.js</li>
                                <li>Ruby</li>
                                <li>Python</li>
                                <li>PHP</li>
                                <li>Curl</li>
                                <li>Java</li>
                                <li>C#</li>
                            </ul>
                </div>
            );
    }

}

export default Developer




        