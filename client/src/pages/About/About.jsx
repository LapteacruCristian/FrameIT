import{Link, useMatch,useResolvedPath} from "react-router-dom";
import "./AboutStyle.css"

export default function About(){
    return <>
    <div className="container column">
        <h1>About</h1>
        <div className="infoContainer">
        <p>
            
                Welcome to FrameIT, a web application for creating structured presentations! 
                With our user-friendly interface, you can easily create professional-looking presentations in no time.
            
        </p>
        <p>
            
                We offer a variety of templates to choose from, so whether you're presenting for work or school, we've got you covered. 
                And if you're feeling creative, you can also customise your own slides with images and text to make your presentation unique.
      
        </p>
        <p>
            
                With our built-in animation and transition features, you can add extra visual interest to your presentation and keep your audience engaged.
          
        </p>
        <p>
            Don't settle for a boring, uninspired presentation. Create something that truly stands out with our web application. Try it out today and see the difference for yourself!
            
        </p>
        </div>
    </div>
    </>

}