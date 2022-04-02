import { Spinner } from 'react-bootstrap';
import useIsMobile from '../component/useIsMobile';

const spinner = {
    flex: 1,
    marginTop:200,
    justifyContent: 'center',
    alignItems:'center'
}
const spinnerMB = {
    flex: 1,
    marginTop:10,
    justifyContent: 'center',
    alignItems:'center'
}
const inSpinner = {
    flex: 1,
    alignSelf:'center'
}
const loadingImage = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '30%',
    height: 'auto',
    marginBottom: 10
}
const loadingImageMB = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%',
    height: 'auto',
    marginBottom: 10
}

function LoadingIMG() {
    const screenSize = useIsMobile()
    return (
        <div style={spinner}>
          <div style={!screenSize ? loadingImage : loadingImageMB}>
            <img src={require("../images/pien.png")}></img> 
          </div>
          <h2>
            <Spinner animation="border" style={inSpinner}/>
            &nbsp;少しお待ちください。
          </h2>
        </div>
    )
}
function Loading() {
    const screenSize = useIsMobile()
    return (
        <div style={!screenSize ? spinner : spinnerMB}>
          <h2>
            <Spinner animation="border" style={inSpinner}/>
            &nbsp;少しお待ちください。
          </h2>
        </div>
    )
}

export {
    LoadingIMG,
    Loading,
}