

//The function displays the pop up for the newSilde action
export default function OpenSlideDetails(setShowProjectDetails) {

    return (
    <div className="popUp">
        <div className="overlay" onClick={()=>setShowProjectDetails(false)}/>
        <div className="popUpContent center">
            <h2>Slide</h2>
            <hr/>
            
            
                <button className="popUpSubmitBtn">View</button>

            <button className="closePopUpBtn" onClick={()=>setShowProjectDetails(false)}>
                    X
            </button>
        </div>
    </div>)
}