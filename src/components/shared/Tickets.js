import React, { Component } from 'react';
import PropTypes from 'prop-types';
import inactiveTic from '../../assets/icons/rating-inactive.png';
import activeTic from '../../assets/icons/rating-active.png';

const emptyTickets = [inactiveTic, inactiveTic, inactiveTic, inactiveTic, inactiveTic];

class Tickets extends Component {

  static propTypes = {
    type: PropTypes.string.isRequired, //'view' or 'edit'
    current: PropTypes.number,
    onRate: PropTypes.func,
  };
  
  state = {
    rating: null,
    currentTickets: [inactiveTic, inactiveTic, inactiveTic, inactiveTic, inactiveTic],
  };

  componentDidMount() {
    this.checkTickets();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.current !== this.props.current){
      this.checkTickets();
    }
  }

  checkTickets = () => {
    if(this.props.current){
      this.setState({ rating: this.props.current }, () => {
        this.fillTickets();
      });
    }
  }

  fillTickets() {
    const fill = (this.state.rating - 1);
    const tickets = emptyTickets.slice();
    for(let i = 0; i <= fill; i++) { 
      tickets[i] = activeTic;
    }
    this.setState({ currentTickets: tickets });

  }
  
  handleClick = ({ target }) => {
    const rating = Number.parseInt(target.id);
    this.setState({ rating: rating }, () => {
      this.props.onRate(this.state.rating);
      this.fillTickets();
    });
  }

  render() {
    const { type } = this.props;
    const { currentTickets } = this.state;

    if(type === 'edit') return (
      <div className="tickets-card">
        {currentTickets.map((tic, i) => <img className="clickable" src={tic} key={i} id={i + 1} onClick={this.handleClick}/>)}
      </div>
    );

    if(type === 'view') return (
      <div className="tickets-card">
        {currentTickets.map((tic, i) => <img src={tic} key={i} />)}
      </div>
    );
  }
}

export default Tickets;