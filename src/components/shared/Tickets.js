import React, { Component } from 'react';
import PropTypes from 'prop-types';
import inactiveTic from '../../assets/icons/rating-inactive.png';
import activeTic from '../../assets/icons/rating-active.png';

const emptyTickets = [inactiveTic, inactiveTic, inactiveTic, inactiveTic, inactiveTic];

class Tickets extends Component {

  static propTypes = {
    type: PropTypes.string.isRequired, //'view' or 'input'
    current: PropTypes.number,
  };
  
  state = {
    rating: null,
    currentTickets: [inactiveTic, inactiveTic, inactiveTic, inactiveTic, inactiveTic],
  };

  componentDidMount() {
    if(this.props.type === 'view'){
      this.setState({ rating: this.props.current }, () => {
        this.fillTickets();
      });
    }
  }

  fillTickets() {
    const fill = (this.state.rating - 1);
    const tickets = this.state.currentTickets;
    for(let i = 0; i <= fill; i++) { 
      tickets[i] = activeTic;
    }
    this.setState({ currentTickets: tickets });
  }
  // componentWillUnmount() {
  //   delete this.root;
  //   delete this.ratingContainer;
  // }

  render() {
    const { type } = this.props;
    const { currentTickets } = this.state;

    return (
      <div className="tickets-card">
        {currentTickets.map((tic, i) => <img src={tic} key={i} />)}
      </div>
    );
  }
}

export default Tickets;