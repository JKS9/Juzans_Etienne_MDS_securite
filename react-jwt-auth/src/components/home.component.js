import React, { Component } from "react"
import AuthService from "../services/auth.service"
import UserService from "../services/user.service";

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.logOut = this.logOut.bind(this)

        this.state = {
            content: [],
            connect: false
        }
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser()
        if (user) {
            this.setState({
                connect: true
            })
        }

        UserService.getAllProduct().then(
            response => {
                let arrayProduct = []
                for (let i=0; i<= response.data.docs.length-1; i++) {
                    let array =
                        <tr>
                            <th scope="row">{response.data.docs[i].id}</th>
                            <th>{response.data.docs[i].name_product}</th>
                            <th>{response.data.docs[i].description_product}</th>
                            <th>{response.data.docs[i].picture}</th>
                            <th>{response.data.docs[i].id_author}</th>
                            <th>{response.data.docs[i].price}</th>
                            {this.state.connect && (
                            <th>
                                <button>  
                                x
                                </button>
                            </th>
                            )}
                        </tr>;
                    arrayProduct.push(array)
                }

                this.setState({
                    content: arrayProduct
                })
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                })
            }
        )
    }

    DeleteProduct(id) {
        console.log(id)
    }

    logOut() {
        AuthService.logout()
    }

    render() {
        return (
            <div className="container-full">
                
                {this.state.connect && (
                    <a href="Login" onClick={this.logOut}>Log Out</a>
                )}
                {!this.state.connect && (
                    <a href="Login">Login</a>
                )}
                <header className="jumbotron">
                    <h2>Home</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                            <th scope="col">Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Picture</th>
                            <th>Author</th>
                            <th>Price</th>
                            {this.state.connect && (
                                <th></th>
                            )}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.content}
                        </tbody>
                    </table>
                </header>
            </div>
        )
    }
}