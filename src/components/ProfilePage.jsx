import React, {Component} from 'react';


class ProfilePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:{
                name: "",
                favr_list: [],
                email: "",
                profile_picture: ''
            }
        }
    }

    componentDidMount() {
        //backend integration with web2py seems interesting
        fetch('https://localhost:8000/api/profilefunction'){

        }

    }

    render() {
        return(
            <div className="Profile_Page">
                <Image img ={this.state.user.profile_picture}></Image>
                <Profile prof={this.state.user}></Profile>
            </div>
        );
    }
}

    function Image(params) {
        return(
            <div className="Image" style={{backgroundImage: 'url(' + params.img + ')'}}></div>
        );
    }

    function Profile(params) {
        return(
            <div className="Profile">
                <p className="Name">{params.user.name}</p>
                <p className="Email">{params.user.email}</p>
                <p className="Favr_List">{params.user.favr_list}</p>
            </div>

        );
    }
    