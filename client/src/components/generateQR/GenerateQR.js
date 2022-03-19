import { Link, withRouter } from "react-router-dom";
import { useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { addItem } from "../../actions/itemActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const GenerateQR = props => {
    const { user } = props.auth;
    const [data, setData] = useState({
        itemName: ''
    });
    const qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        image:
            "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
        dotsOptions: {
            color: "#4267b2",
            type: "rounded"
        },
        imageOptions: {
            crossOrigin: "anonymous",
            margin: 20
        }
    });
    const onChange = e => {
        setData({ [e.target.name]: e.target.value })
    }
    const onSubmit = e => {
        e.preventDefault();
        const itemData = {
            ...data,
            ...{
                email: user.email
            }
        }
        console.log(itemData);
        props.addItem(itemData, props.history);
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
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                                type="submit"
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                                Save item
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

GenerateQR.propTypes = {
    addItem: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { addItem }
  )(withRouter(GenerateQR));
  