//From dependencies
import React, { Component } from "react";

export default class Busca extends Component {
   constructor(props) {
      super(props);
      this.state = {
         value: ""
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }
   handleSubmit = event => {
      window.location.href = `/?q=${this.state.value}`;
      event.preventDefault();
      // this.props.history.push(`/?q=${e.target.value}`);
   };

   handleChange = event => {
      this.setState({ value: event.target.value });
   };

   render() {
      return (
         <div className="row">
            <form onSubmit={this.handleSubmit}>
               <div className="search-area">
                  <input
                     type="text"
                     value={this.state.value}
                     onChange={this.handleChange}
                     id="buscaInput"
                     className="search-input"
                     placeholder="Busque um produto"
                  />
               </div>
            </form>
         </div>
      );
   }
}
