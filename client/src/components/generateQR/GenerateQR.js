import { Link } from "react-router-dom";
import { useState } from "react";
const GenerateQR = () => {
    const [data, setData] = useState({
        itemName: ''
    });
    const onChange = e => {
        setData({[e.target.name]: e.target.value  })
    }
    const onSubmit = e => {
        e.preventDefault();
        console.log(data);
    }
    return (
        <div className="container" style={{ marginTop: "2rem" }}>
            <div className="row">
                <div className="col s8 offset-s2">
                    <Link to="/dashboard" className="btn-flat waves-effect">
                        <i className="material-icons left">keyboard_backspace</i> Back to
                        Dashboard
                    </Link>
                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <h4>
                            <b>Generate</b> QR for new item
                        </h4>
                    </div>
                    <form noValidate onSubmit={onSubmit}>
                        <div className="col s12 input-field">
                            <input
                                onChange={e => onChange(e)}
                                value={data.name}
                                name="itemName"
                                // error={errors.name}
                                id="itemName"
                                type="text"
                            />
                            <label htmlFor="itemName">Name</label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default GenerateQR;