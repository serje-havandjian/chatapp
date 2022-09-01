import { useState } from "react"
import {Button} from "semantic-ui-react"
import Essenproducts from "./Essenproducts"


function Essen(){

    const [displayEssenProduct, setDisplayEssenProduct] = useState(false)


    function handleChangePage(){
        setDisplayEssenProduct(!displayEssenProduct)
    }


    return(
        <div id="Essenbackground">
            <div>
            <h1>Essen</h1>
                <span>Find Your Essentials</span> 
                <h1>TEST</h1>
            </div>

            <div>
                <h2>Do It Myself</h2>
                <Button onClick={handleChangePage}>Browse Moisturizers</Button>
            </div>

            <div>
                <h2>Do It For Me</h2>
                <button>Start Quiz</button>
            </div>

            <div>{displayEssenProduct === true ? <Essenproducts /> : null }
            </div>

        </div>
        
    )

}

export default Essen