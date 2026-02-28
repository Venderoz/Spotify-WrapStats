import './ActionButton.css'

function ActionButton({fn, content}){
    return(
        <div className="action-btn-container">
            <button onClick={fn} className="action-btn">{content}</button>
        </div>
    )
}
export default ActionButton